export interface CoopResponse {
  success: boolean;
  message?: string;
  coop: Coop;
}
export interface CoopsResponse {
  success: boolean;
  message?: string;
  coops?: Coop[];
}
export interface Coop {
  id: number;
  name: string;
  menber_nr: number;
}
