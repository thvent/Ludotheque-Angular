export interface User {
  id: number;
  nom: string;
  prenom: string;
  pseudo: string;
  email: string;
  jwtToken?: string;
}
