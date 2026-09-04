import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import {
  PilotDTO,
  RaceResultDTO,
  DriverStats,
  RaceResult,
  Driver,
  RaceSummary,
  DriverRaceResult,
  RaceDetails,
  DriverProfile,
} from '../models';
import { getBestFastestLap, getPositionsPoints, parsePilot, parseResult } from '../utils/helpers';

const F1_POINTS: Record<number, number> = {
  1: 25,
  2: 18,
  3: 15,
  4: 12,
  5: 10,
  6: 8,
  7: 6,
  8: 4,
  9: 2,
  10: 1,
};

@Injectable({
  providedIn: 'root',
})
export class KartingService {
  private http = inject(HttpClient);

  private apiUrl = environment.dbUrl;

  drivers = signal<Driver[]>([]);
  results = signal<RaceResult[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  activeSeason = signal<number>(new Date().getFullYear());
  selectedRaceId = signal<number>(1);

  cargarDatos() {
    this.loading.set(true);
    this.error.set(null);

    const pilots$ = this.http
      .get<PilotDTO[]>(`${this.apiUrl}?sheet=Pilotos`)
      .pipe(map((dtos) => dtos.map(parsePilot)));

    const raceResults$ = this.http
      .get<RaceResultDTO[]>(`${this.apiUrl}?sheet=Resultados`)
      .pipe(map((dtos) => dtos.map(parseResult)));

    forkJoin({
      pilots: pilots$,
      results: raceResults$,
    }).subscribe({
      next: ({ pilots, results }) => {
        this.drivers.set(pilots);
        this.results.set(results);
        const seasons = Array.from(new Set(results.map((r) => Number(r.season)))).sort(
          (a, b) => b - a,
        );
        if (seasons.length > 0) {
          this.activeSeason.set(seasons[0]);
        }

        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando datos del Sheet:', err);
        this.error.set('ERROR_LOAD_DATA: Falló la conexión con los pits.');
        this.loading.set(false);
      },
    });
  }
  availableSeasons = computed<number[]>(() => {
    const list = this.results().map((r) => r.season);
    return Array.from(new Set(list)).sort((a, b) => a - b);
  });

  setSeason(temp: number) {
    this.activeSeason.set(temp);
  }

  seasonResults = computed<RaceResult[]>(() => {
    const year = this.activeSeason();
    return this.results().filter((r) => r.season === year);
  });
  seasonBestLap = computed<DriverRaceResult | null>(() => {
    const seasonRaces = this.seasonResults();
    const bestTime = getBestFastestLap(seasonRaces);
    const race = seasonRaces.find((sr) => sr.fastest_lap === bestTime);

    const driver = this.drivers().find((d) => d.id === race?.driver_id);
    if (!driver || !race) {
      return null;
    }
    return {
      ...driver,
      ...race,
      points: 0,
    };
  });
  leaderboard = computed<DriverStats[]>(() => {
    const pilotosList = this.drivers();
    const carreras = this.seasonResults();

    if (pilotosList.length === 0) return [];

    const statsMap = new Map<number, DriverStats>();
    for (const p of pilotosList) {
      statsMap.set(p.id, {
        id: p.id,
        number: p.number,
        name: p.name,
        nickname: p.nickname,
        surname: p.surname,
        points: 0,
        victories: 0,
        podiums: 0,
        participations: 0,
        poleStarts: 0,
      });
    }

    for (const r of carreras) {
      const entry = statsMap.get(r.driver_id);
      if (entry && !isNaN(r.start_position) && r.start_position > 0) {
        entry.participations += 1;
        const pts = getPositionsPoints(r.end_position) || 0;

        entry.points += pts;
        if (r.end_position === 1) {
          entry.victories += 1;
        }
        if (r.end_position <= 3) {
          entry.podiums += 1;
        }
        if (r.start_position <= 1) {
          entry.poleStarts += 1;
        }
      }
    }

    return Array.from(statsMap.values()).sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      if (b.victories !== a.victories) {
        return b.victories - a.victories;
      }
      return b.podiums - a.podiums;
    });
  });

  availableRaces = computed<RaceSummary[]>(() => {
    const races = this.seasonResults();
    const map = new Map<number, RaceSummary>();

    for (const r of races) {
      if (!map.has(r.race_id)) {
        map.set(r.race_id, {
          id: r.race_id,
          date: r.date,
          season: r.season,
          circuitName: r.circuitName,
        });
      }
    }

    return Array.from(map.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  });

  getDriverStats(driverId: number): DriverProfile {
    const driver = this.drivers().find((p) => p.id === driverId)!;
    const races = this.results().filter((r) => r.driver_id === driverId);

    let totalPoints = 0;
    let victories = 0;
    let podiums = 0;
    let bestPosition = races.length > 0 ? 99 : 0;
    let poleStarts = 0;

    const participations = races.length;

    for (const r of races) {
      const pos = Number(r.end_position);
      const pts = getPositionsPoints(pos);

      totalPoints += pts;
      if (pos === 1) {
        victories++;
      }
      if (pos >= 1 && pos <= 3) {
        podiums++;
      }

      if (pos < bestPosition) {
        bestPosition = pos;
      }

      if (r.start_position === 1) {
        poleStarts++;
      }
    }

    const fastest_lap = getBestFastestLap(races);

    return {
      ...driver,
      participations,
      points: totalPoints,
      poleStarts,
      podiums,
      bestPosition,
      victories,
      races,
      fastest_lap,
    };
  }

  getRaceDetails(raceId: number): RaceDetails | null {
    const races = this.results().filter((r) => r.race_id === raceId);
    if (races.length === 0) return null;

    const raceInfo = races[0];
    const driversMap = new Map(this.drivers().map((p) => [p.id, p]));

    const results: DriverRaceResult[] = races
      .map((r) => {
        const p = driversMap.get(r.driver_id);
        const endPos = Number(r.end_position);
        const startPos = Number(r.start_position);

        const pts = getPositionsPoints(endPos) || 0;

        return {
          ...p,
          start_position: startPos,
          end_position: endPos,
          points: pts,
          fastest_lap: r.fastest_lap,
        } as DriverRaceResult;
      })
      .sort((a, b) => a.end_position - b.end_position);

    return {
      id: raceId,
      date: raceInfo.date,
      season: raceInfo.season,
      results: results,
      winner: results.find((c) => c.end_position === 1)!,
      circuitName: raceInfo.circuitName,
    };
  }
}
