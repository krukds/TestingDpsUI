import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocationDPS } from '../../Models/location.model';


@Injectable({
    providedIn: 'root'
  })
  export class LocationService {
    private url = 'http://127.0.0.1:8000/api/locations';
  
    constructor(private http: HttpClient) {}
  
    getLocations(): Observable<LocationDPS[]> {
      return this.http.get<LocationDPS[]>(this.url).pipe(
        tap((locations: LocationDPS[]) => console.log('Fetched locations:', locations))
      );
    }
  }