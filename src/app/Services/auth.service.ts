import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthToken } from '../../Models/auth-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://127.0.0.1:8000/api/auth/login';
  private signUpUrl = 'http://127.0.0.1:8000/api/auth/signup';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthToken> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http.post<AuthToken>(this.loginUrl, formData).pipe(
      tap(response => {
        this.setToken(response.accessToken); 
        this.setName(username);
      })
    );
  }

//   signup(email: string, password: string, phoneNumber: string, firstName: string, lastName: string): Observable<AuthToken> {
//     return this.http.post<AuthToken>(this.signUpUrl, { email, password, phoneNumber, firstName, lastName }).pipe(
//       tap(response => [this.setToken(response.accessToken), this.setName(email)])
//     );
//   }
  

  setToken(token: string): void {
    sessionStorage.setItem('TOKEN', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('TOKEN');
  }

  clearToken(): void {
    sessionStorage.removeItem('TOKEN');
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Перевіряє чи токен існує
  }

  setName(name: string): void {
    sessionStorage.setItem('NAME', name);
  }
  getName(): string | null {
    return sessionStorage.getItem('NAME');
  }

  clearName(): void {
    sessionStorage.removeItem('NAME');
  }
}