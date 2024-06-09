import { Component, ViewChild } from '@angular/core';
import { AddEditTestingModalComponent } from '../add-edit-testing-modal/add-edit-testing-modal.component';
import { AddEditTestingModalService } from '../../Services/add-edit-testing-modal.service';
import { CommonModule } from '@angular/common';

import { TestingListComponent } from '../testing-list/testing-list.component';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-test-admin',
  standalone: true,
  imports: [AddEditTestingModalComponent, TestingListComponent, AlertComponent, CommonModule],
  providers: [],
  templateUrl: './test-admin.component.html',
  styleUrl: './test-admin.component.css'
})
export class TestAdminComponent {
  @ViewChild(TestingListComponent) testingListComponent!: TestingListComponent;
  @ViewChild('alertComponent') alertComponent!: AlertComponent;
  constructor(
    private addEditTestingModalService: AddEditTestingModalService,
  ) {}

  openForm(): void {
    this.addEditTestingModalService.openForm();
  }

  onTestingAdded(): void {
    this.testingListComponent.loadTestings();
    this.alertComponent.message = "Тестування успішно додано!";
    this.alertComponent.showAlert();
  }

  onTestingUpdated(): void {
    this.testingListComponent.loadTestings();
    this.alertComponent.message = "Тестування успішно оновлено!";
    this.alertComponent.showAlert();
  }

  onTestingDeleted(): void {
    this.testingListComponent.loadTestings();
    this.alertComponent.message = "Тестування успішно видалено!";
    this.alertComponent.showAlert();
  }
}
