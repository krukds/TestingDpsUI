import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddEditUserComponent } from '../add-edit-user-modal/add-edit-user-modal.component';
import { CommonModule } from '@angular/common';
import { addEditUserModalService } from '../../Services/add-edit-user-modal.service';

import { LocationListComponent } from '../location-list/location-list.component';
import { DepartmentListComponent } from '../department-list/department-list.component';
import { AlertComponent } from '../alert/alert.component';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [RouterOutlet, AddEditUserComponent, CommonModule, LocationListComponent, DepartmentListComponent, 
    UserListComponent, AlertComponent],
  providers: [],
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent {
  @ViewChild(UserListComponent) userListComponent!: UserListComponent;
  @ViewChild('alertComponent') alertComponent!: AlertComponent;


  location_id: number | null = null;
  department_id: number | null = null;

  constructor(
    private addEditUserModalService: addEditUserModalService,
  ) {}

  openForm(): void {
    this.addEditUserModalService.openForm();
  }

  onLocationSelected(locationId: number | null) { // Отримуємо ідентифікатор локації
    this.location_id = locationId;
    console.log('location: ' + this.location_id);
    this.userListComponent.loadUsers(this.location_id, this.department_id);
  }

  onDepartmentSelected(departmentId: number | null) { // Отримуємо ідентифікатор відділу
    this.department_id = departmentId;
    console.log('department: ' + this.department_id);
    this.userListComponent.loadUsers(this.location_id, this.department_id);
  }

  onUserAdded(): void {
    this.userListComponent.loadUsers(this.location_id, this.department_id);
    this.alertComponent.message = "Користувача успішно додано!";
    this.alertComponent.showAlert();
  }

  onUserUpdated(): void {
    this.userListComponent.loadUsers(this.location_id, this.department_id);
    this.alertComponent.message = "Користувача успішно оновлено!";
    this.alertComponent.showAlert();
  }

  onUserDeleted(): void {
    this.userListComponent.loadUsers(this.location_id, this.department_id);
    this.alertComponent.message = "Користувача успішно видалено!";
    this.alertComponent.showAlert();
  }
}
