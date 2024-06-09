import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { addEditUserModalService } from '../../Services/add-edit-user-modal.service';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from '../location-list/location-list.component';
import { DepartmentListComponent } from '../department-list/department-list.component';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-add-edit-user-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, LocationListComponent, AlertComponent, DepartmentListComponent],
  providers: [AuthService],
  templateUrl: './add-edit-user-modal.component.html',
  styleUrls: ['./add-edit-user-modal.component.css']
})
export class AddEditUserComponent implements OnInit {
  @ViewChild('alertComponent') alertComponent!: AlertComponent;
  @Output() userAdded = new EventEmitter<void>();
  @Output() userUpdated = new EventEmitter<void>();
  
  isFormVisible = false;

  username: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  phone: string = '';
  location_id: number | null = null;
  department_id: number | null = null;
  isEditMode = false;
  addEditHeader = '';
  addEditButton = '';

  constructor (
    private authService: AuthService,
    private addEditUserModalService: addEditUserModalService
  ) {
    this.addEditUserModalService.isVisible$.subscribe((isVisible) => {
      this.isFormVisible = isVisible;
      if (isVisible) {
        const userId = this.addEditUserModalService.getEditUserId();
        if (userId) {
          this.loadUser(userId);
          this.isEditMode = true;
          this.addEditHeader = 'Редагувати користувача';
          this.addEditButton = 'Редагувати';
        } else {
          this.resetForm();
          this.isEditMode = false;
          this.addEditHeader = 'Додати користувача';
          this.addEditButton = 'Додати';
        }
      }
    });


  }

  ngOnInit(): void {}

  loadUser(userId: number): void {
    this.authService.getUserById(userId).subscribe({
      next: (user) => {
        this.username = user.email;
        this.password = user.password;
        this.firstname = user.first_name;
        this.lastname = user.last_name;
        this.phone = user.phone;
        this.location_id = user.location_id;
        this.department_id = user.department_id;
        console.log("user", user);      
      },
      error: (error) => {
        console.error('Error loading user!', error);
      }
    });
  }

  resetForm(): void {
    this.username = '';
    this.password = '';
    this.firstname = '';
    this.lastname = '';
    this.phone = '';
    this.location_id = null;
    this.department_id = null;
  }

  onSubmit(): void {
    const locationId = this.location_id ?? 0;
    const departmentId = this.department_id ?? 0;

    if (this.isEditMode) {
      const userId = this.addEditUserModalService.getEditUserId();
      if (userId) {
        this.authService.updateUser(userId, this.username, this.password, this.firstname, this.lastname, this.phone, locationId, departmentId).subscribe({
          next: () => {
            console.log("user updated successfully");
            this.alertComponent.message = "Користувача успішно оновлено!";
            this.alertComponent.showAlert();
            this.userUpdated.emit();
          },
          error: (error) => {
            console.log("update failed");
            this.alertComponent.message = "Помилка оновлення користувача! " + error.message;
            this.alertComponent.showAlert();
          }
        });
      }
    } else {
      this.authService.signup(this.username, this.password, this.firstname, this.lastname, this.phone, locationId, departmentId).subscribe({
        next: () => {
          console.log("user added successfully");
          this.alertComponent.message = "Користувача успішно додано!";
          this.alertComponent.showAlert();
          this.userAdded.emit();
        },
        error: (error) => {
          console.log("register failed");
          this.alertComponent.message = "Помилка додавання користувача! " + error.message;
          this.alertComponent.showAlert();
        }
      });
    }
    this.closeForm();
  }

  closeForm(): void {
    this.addEditUserModalService.closeForm();
  }

  onLocationSelected(locationId: number | null) {
    this.location_id = locationId;
    console.log('location: ' + this.location_id);
  }

  onDepartmentSelected(departmentId: number | null) {
    this.department_id = departmentId;
    console.log('department: ' + this.department_id);
  }
}
