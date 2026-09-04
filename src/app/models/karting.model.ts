export interface Driver {
  id: number;
  name: string;
  surname: string;
  nickname: string;
  number: number;
  avatar_url?: string;
}

export interface RaceResult {
  race_id: number;
  circuitName: string;
  date: string;
  driver_id: number;
  start_position: number;
  end_position: number;
  fastest_lap: string;
  season: number;
}

export interface DriverStats extends Driver {
  points: number;
  victories: number;
  podiums: number;
  participations: number;
  poleStarts: number;
  bestPosition?: number;
}

export interface DriverRaceResult
  extends Pick<RaceResult, 'end_position' | 'start_position' | 'fastest_lap'>, Driver {
  points: number;
}

export interface RaceSummary {
  id: number;
  date: string;
  season: number;
  circuitName: string;
}

export interface RaceDetails extends RaceSummary {
  results: DriverRaceResult[];
  winner: DriverRaceResult;
}

export interface DriverProfile extends DriverStats {
  races: RaceResult[];
  fastest_lap?: string;
}
