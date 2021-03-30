export interface Jeu {
  id: number;
  nom: string;
  description: string;
  theme: number;
  editeur: number;
  langue: string;
  age: number;
  poids: number;
  nombre_joueurs: any;
  categorie: string;
  duree: string;
  regles: string;
  jwtToken?: string;
}
