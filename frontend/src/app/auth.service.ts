import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Back-end API base URL
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, {withCredentials: true});
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/auth`, {
      withCredentials: true
    }).pipe(
      map(response => ({ authenticated: true })),
      catchError(() => {
        return of({ authenticated: false });
      })
    );
  }
}
