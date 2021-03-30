import {Jeu} from './jeu';

export interface UserGame {
  jeu: Jeu;
  lieu: string;
  prix: string;
  date_achat: string;
  jwtToken?: string;
}
