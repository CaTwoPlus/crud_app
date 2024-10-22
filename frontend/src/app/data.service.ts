import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Kapcsolat back-enddel 
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getChannels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/csatornak`);
  }

  getShows(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/musorok`);
  }

  getCast(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/szereplok`);
  }

  getBroadcasts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/kozvetitesek`);
  }

  // Új elem hozzáadása
  createItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item);
  }

  // Meglévő elem módosítása
  updateItem(id: string, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);
  }

  // Meglévő elem törlése
  deleteItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
