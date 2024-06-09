import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Department } from '../../Models/department.model';


@Injectable({
    providedIn: 'root'
  })
  export class DepartmentService {
    private url = 'http://127.0.0.1:8000/api/departments';
  
    constructor(private http: HttpClient) {}
  
    getDepartments(): Observable<Department[]> {
      return this.http.get<Department[]>(this.url).pipe(
        tap((departments: Department[]) => console.log('Fetched departments:', departments))
      );
    }
  }