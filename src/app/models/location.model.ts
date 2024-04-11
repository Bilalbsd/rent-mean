export interface Location {
    _id?: string;
    idBien: string; // Identifiant du bien associé
    mailLoueur: string; // Adresse e-mail du loueur
    dateDebut: string; // Date de début de la location (format AAAAMMJJ)
    dateFin: string; // Date de fin de la location (format AAAAMMJJ)
    // avis: number | undefined; // Note de l'avis laissé par le locataire
    avis?: {
      note: number;
      commentaire: string;
    }
  }
  