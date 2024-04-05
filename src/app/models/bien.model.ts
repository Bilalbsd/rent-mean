// bien.model.ts
export interface Bien {
    _id: string;
    mailProprio: string;
    commune: string;
    rue: string;
    cp: number;
    nbCouchages: number;
    nbChambres: number;
    distance: number;
    prix: number;
    image: string;
    longitude: number;
    latitude: number;
  }
  