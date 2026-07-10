import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const API_URL = 'http://localhost:5138/api/admin';
const TOKEN_KEY = 'admin_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<{ token: string; username: string }>(`${API_URL}/login`, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          if (res?.token) {
            localStorage.setItem(TOKEN_KEY, res.token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}