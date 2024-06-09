import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class addEditUserModalService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  private editUserId: number | null = null;

  openForm(userId: number | null = null): void {
    this.editUserId = userId;
    this.isVisibleSubject.next(true);
  }

  closeForm(): void {
    this.editUserId = null;
    this.isVisibleSubject.next(false);
  }

  getEditUserId(): number | null {
    return this.editUserId;
  }
}
