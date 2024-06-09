import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddEditTestingModalService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  private editTestingId: number | null = null;

  openForm(testingId: number | null = null): void {
    this.editTestingId = testingId;
    this.isVisibleSubject.next(true);
  }

  closeForm(): void {
    this.editTestingId = null;
    this.isVisibleSubject.next(false);
  }

  getEditTestingId(): number | null {
    return this.editTestingId;
  }
}
