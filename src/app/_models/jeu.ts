export interface Jeu {
  id: number;
  nom: string;
  description: string;
  theme_id: number;
  editeur_id: number;
  langue: string;
  age: number;
  nombre_joueurs: any;
  poids: string;
  categorie: string;
  duree: string;
  regles: string;
  jwtToken?: string;
}
