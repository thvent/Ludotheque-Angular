export interface Jeu {
  id: number;
  nom: string;
  description: string;
  theme: number;
  editeur: number;
  langue: string;
  age: number;
  poids: string;
  nombreJoueurs: number;
  categorie: string;
  duree: string;
  regles: string;
  jwtToken?: string;
}
