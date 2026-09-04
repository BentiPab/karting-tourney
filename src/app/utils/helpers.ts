import { Driver, PilotDTO, RaceResult, RaceResultDTO } from '../models';
import { POINTS_MAP } from './constants';

export const parsePilot = (dto: PilotDTO): Driver => {
  return {
    id: Number(dto.ID),
    name: dto.NOMBRE,
    surname: dto.APELLIDO,
    nickname: dto.APODO,
    number: Number(dto.NUMERO),
    avatar_url: dto.FOTO_ID
      ? `https://drive.google.com/thumbnail?id=${dto.FOTO_ID}&sz=w400`
      : undefined,
  };
};

export const parseResult = (dto: RaceResultDTO): RaceResult => {
  return {
    race_id: Number(dto.ID_CARRERA),
    season: Number(dto.TEMPORADA) || new Date().getFullYear(),
    date: dto.FECHA,
    driver_id: Number(dto.ID_PILOTO),
    start_position: Number(dto.POSICION_INICIAL),
    end_position: Number(dto.POSICION_FINAL),
    fastest_lap: String(dto.VUELTA_RAPIDA || '').trim(),
    circuitName: dto.CIRCUITO,
  };
};

export const getPositionsPoints = (pos: number) => {
  return POINTS_MAP[pos];
};

export function getBestFastestLap(races: { fastest_lap?: string }[]): string {
  let bestTimeStr = '--:--.---';
  let minSeconds = Infinity;

  for (const race of races) {
    const raw = race.fastest_lap?.trim();
    if (!raw || raw === '--:--.---') continue;

    const seconds = parseFloat(raw.replace(',', '.'));

    if (!isNaN(seconds) && seconds > 0 && seconds < minSeconds) {
      minSeconds = seconds;
      bestTimeStr = raw;
    }
  }

  return bestTimeStr;
}
