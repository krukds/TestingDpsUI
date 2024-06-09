import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFilterService {
  private locationSubject = new BehaviorSubject<number | null>(null);
  private departmentSubject = new BehaviorSubject<number | null>(null);

  location$ = this.locationSubject.asObservable();
  department$ = this.departmentSubject.asObservable();

  setLocation(locationId: number | null) {
    this.locationSubject.next(locationId);
  }

  setDepartment(departmentId: number | null) {
    this.departmentSubject.next(departmentId);
  }

  getCurrentLocation(): number | null {
    return this.locationSubject.getValue();
  }

  getCurrentDepartment(): number | null {
    return this.departmentSubject.getValue();
  }
}
