import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';
import { CommonModule } from '@angular/common';

import { AddEditTestingModalService } from '../../Services/add-edit-testing-modal.service';
import { TestingService } from '../../Services/testing.service';


@Component({
  selector: 'app-add-edit-testing-modal',
  standalone: true,
  imports: [FormsModule, AlertComponent, CommonModule],
  providers: [TestingService],
  templateUrl: './add-edit-testing-modal.component.html',
  styleUrl: './add-edit-testing-modal.component.css'
})
export class AddEditTestingModalComponent {
  addEditHeader = '';
  addEditButton = '';

  testingname: string = '';
  testingtime: number = 0;

  isFormVisible = false;
  isEditMode = false;

  @ViewChild('alertComponent') alertComponent!: AlertComponent;
  @Output() testingAdded = new EventEmitter<void>();
  @Output() testingUpdated = new EventEmitter<void>();

  constructor(
    private addEditTestingModalService: AddEditTestingModalService,
    private testingService: TestingService
  ){
    this.addEditTestingModalService.isVisible$.subscribe((isVisible) => {
      this.isFormVisible = isVisible;
      if (isVisible) {
        const testingId = this.addEditTestingModalService.getEditTestingId();
        if (testingId) {
          this.loadTesting(testingId);
          this.isEditMode = true;
          this.addEditHeader = 'Редагувати тестування';
          this.addEditButton = 'Редагувати';
        } else {
          this.resetForm();
          this.isEditMode = false;
          this.addEditHeader = 'Додати тестування';
          this.addEditButton = 'Додати';
        }
      }
    });
  }
  loadTesting(testingId: number): void {
    this.testingService.getTestingById(testingId).subscribe({
      next: (testing) => {
        this.testingname = testing.name;
        this.testingtime = testing.time;
        console.log("testing", testing);      
      },
      error: (error) => {
        console.error('Error loading testing!', error);
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      const testingId = this.addEditTestingModalService.getEditTestingId();
      if (testingId) {
        this.testingService.updateTesting(testingId, this.testingname, this.testingtime).subscribe({
          next: () => {
            console.log("testing updated successfully");
            this.alertComponent.message = "Тестування успішно оновлено!";
            this.alertComponent.showAlert();
            this.testingUpdated.emit();
          },
          error: (error) => {
            console.log("update failed");
            this.alertComponent.message = "Помилка оновлення тестування! " + error.message;
            this.alertComponent.showAlert();
          }
        })
      }
    } else {
      this.testingService.addTesting(this.testingname, this.testingtime).subscribe({
        next: () => {
          console.log("testing adding successfully");
          this.alertComponent.message = "Тестування успішно додано!";
          this.alertComponent.showAlert();
          this.testingAdded.emit();
        },
        error: (error) => {
          console.log("adding failed");
          this.alertComponent.message = "Помилка додавання тестування! " + error.message;
          this.alertComponent.showAlert();
        }
      })
    }
    this.closeForm();
  }

  resetForm(): void {
    this.testingname = '';
    this.testingtime = 0;
  }

  closeForm(): void {
    this.addEditTestingModalService.closeForm();
  }
}
