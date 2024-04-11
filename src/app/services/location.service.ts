import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  private apiUrl = 'http://localhost:3000/api/locations';

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }

  getLocationsByProprio(mailProprio: string): Observable<Location> {
    const url = `${this.apiUrl}?mailProprio=${mailProprio}`;
    return this.http.get<Location>(url);
  }

  getLocationById(idBien: string): Observable<Location> {
    const url = `${this.apiUrl}/${idBien}`;
    return this.http.get<Location>(url);
  }

  addLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.apiUrl, location);
  }

  updateLocation(id: string, location: Location): Observable<Location> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Location>(url, location);
  }

  deleteLocation(id: string): Observable<Location> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Location>(url);
  }
}
