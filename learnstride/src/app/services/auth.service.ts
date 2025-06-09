import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface LoginPayload {
  email: string;
  password: string;
  
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7109/api/Auth'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, payload).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  decodeToken(token: string | null): any {
  try {
    if (!token) return null;
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload)); // 👈 Decodes base64
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
getUserId(): number | null {
  const token = this.getToken();
  const decoded = this.decodeToken(token);

  // .NET emits long URI claims, not short ones like "nameidentifier"
  const nameId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  return nameId ? parseInt(nameId) : null;
}

}
