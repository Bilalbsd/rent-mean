export interface Location {
  _id?: string;
  idBien: string;
  mailLoueur: string;
  dateDebut: string;
  dateFin: string;
  avis?: {
      note: number;
      commentaire: string;
  }[];
}
