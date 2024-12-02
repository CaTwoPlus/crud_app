import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map(response => {
        if (response.authenticated) {
          this.router.navigate(['/admin']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        // Ha az autentikáció nem sikerül, hozzáférhetővé teszi a login oldalt
        return of(true);
      })
    );
  }
}