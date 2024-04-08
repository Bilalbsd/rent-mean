import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:3000/api/locations'; // L'URL de votre API de backend pour les locations

  constructor(private http: HttpClient) { }

  // Récupérer toutes les locations
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }

  // Récupérer les locations par mailProprio
  getLocationsByProprio(mailProprio: string): Observable<Location> {
    const url = `${this.apiUrl}?mailProprio=${mailProprio}`;
    return this.http.get<Location>(url);
  }

  // Récupérer les locations par mailProprio
  getLocationById(idBien: string): Observable<Location> {
    const url = `${this.apiUrl}/${idBien}`;
    return this.http.get<Location>(url);
  }

  // Ajouter une nouvelle location
  addLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.apiUrl, location);
  }

  // Mettre à jour une location existante
  updateLocation(id: string): Observable<Location> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Location>(url, location);
  }

  // Supprimer une location existante
  deleteLocation(id: string): Observable<Location> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Location>(url);
  }
}
