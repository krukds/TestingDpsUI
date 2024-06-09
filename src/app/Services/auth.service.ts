import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthToken } from '../../Models/auth-token.model';
import { UserDetailModel, UserModel } from '../../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://127.0.0.1:8000/api/auth/login';
  private signUpUrl = 'http://127.0.0.1:8000/api/auth/signup';
  private baseUrl = 'http://127.0.0.1:8000/api/auth';


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

  signup(email: string, password: string, first_name: string, last_name: string, phone: string, location_id: number, department_id: number): Observable<AuthToken> {
    return this.http.post<AuthToken>(this.signUpUrl, { email, password, first_name, last_name, phone, location_id, department_id}).pipe(
      tap(response => [this.setToken(response.accessToken), this.setName(email)])
    );
  }

  getAllUsers(location_id: number | null, department_id: number | null): Observable<UserDetailModel[]> {
    let params = new HttpParams();
    
    if (location_id !== null) {
      params = params.set('location_id', location_id.toString());
    }
    
    if (department_id !== null) {
      params = params.set('department_id', department_id.toString());
    }
    
    return this.http.get<UserDetailModel[]>(this.baseUrl, { params });
  }

  updateUser(userId: number, email: string, password: string, first_name: string, last_name: string, phone: string, location_id: number, department_id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/id?user_id=${userId}`, { email, password, first_name, last_name, phone, location_id, department_id });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/id?user_id=${userId}`);
  }

  getUserById(userId: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}/id?user_id=${userId}`);
  }

  getUserByEmail(email: string): Observable<UserDetailModel> {
    return this.http.get<UserDetailModel>(`${this.baseUrl}/email?email=${email}`);
  }
  
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