import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Kapcsolat back-enddel 
  private apiUrl = 'http://localhost:3000/musorujsag';

  constructor(private http: HttpClient) {}

  // Teljes adatbázis lekérése 
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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
