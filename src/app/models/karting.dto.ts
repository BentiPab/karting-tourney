export interface PilotDTO {
  ID: number | string;
  NOMBRE: string;
  APELLIDO: string;
  APODO: string;
  NUMERO: number | string;
  FOTO_ID?: string;
}

export interface RaceResultDTO {
  ID_CARRERA: number | string;
  FECHA: string;
  ID_PILOTO: number | string;
  POSICION_INICIAL: number | string;
  POSICION_FINAL: string;
  VUELTA_RAPIDA: string;
  TEMPORADA: number | string;
  CIRCUITO: string;
}
