import {UserGame} from './user-game';

export interface UserG {
  id: number;
  nom: string;
  prenom: string;
  pseudo: string;
  email: string;
  jeux: UserGame[];
  jwtToken?: string;
}
