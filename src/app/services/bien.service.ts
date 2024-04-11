import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bien } from '../models/bien.model';


@Injectable({
  providedIn: 'root'
})

export class BienService {
  private apiUrl = 'http://localhost:3000/api/biens';

  constructor(private http: HttpClient) {}

  getBiens(): Observable<Bien[]> {
    return this.http.get<Bien[]>(this.apiUrl);
  }

  getBien(id: string): Observable<Bien> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Bien>(url);
  }

  addBien(bien: Bien): Observable<Bien> {
    return this.http.post<Bien>(this.apiUrl, bien);
  }

  updateBien(bien: Bien): Observable<Bien> {
    const url = `${this.apiUrl}/${bien._id}`;
    return this.http.put<Bien>(url, bien);
  }

  deleteBien(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  rechercheBiens(criteria: any): Observable<Bien[]> {
    let params = new HttpParams();

    if (criteria.dateDebut) params = params.set('dateDebut', criteria.dateDebut);
    if (criteria.dateFin) params = params.set('dateFin', criteria.dateFin);
    if (criteria.commune) params = params.set('commune', criteria.commune);
    if (criteria.prixMax) params = params.set('prixMax', criteria.prixMax);
    if (criteria.nbChambresMin) params = params.set('nbChambresMin', criteria.nbChambresMin);
    if (criteria.nbCouchagesMin) params = params.set('nbCouchagesMin', criteria.nbCouchagesMin);
    if (criteria.distanceMax) params = params.set('distanceMax', criteria.distanceMax);

    return this.http.get<Bien[]>(`${this.apiUrl}/recherche`, { params: params });
  }
  
}


