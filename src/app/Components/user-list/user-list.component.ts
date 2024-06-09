import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { UserFilterService } from '../../Services/user-filter.service';
import { UserDetailModel } from '../../../Models/user.model';
import { addEditUserModalService } from '../../Services/add-edit-user-modal.service'; // Імпортуйте addEditUserModalService

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  providers: [AuthService],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'] // Виправлено стилі на styleUrls
})
export class UserListComponent implements OnInit {
  users: UserDetailModel[] = [];
  @Output() userDeleted = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private userFilterService: UserFilterService,
    private addEditUserModalService: addEditUserModalService // Додаємо addEditUserModalService для редагування
  ) {}

  ngOnInit(): void {
    this.userFilterService.location$.subscribe(locationId => {
      this.loadUsers(locationId, this.userFilterService.getCurrentDepartment());
    });

    this.userFilterService.department$.subscribe(departmentId => {
      this.loadUsers(this.userFilterService.getCurrentLocation(), departmentId);
    });
  }

    loadUsers(location_id: number | null, department_id: number | null): void {
      this.authService.getAllUsers(location_id, department_id).subscribe({
        next: (data: UserDetailModel[]) => {
          this.users = data;
          console.log('Fetched users:', this.users);
        },
        error: (error) => {
          console.error('Error fetching users!', error);
        }
      });
    }

  editUser(userId: number): void {
    // Викликаємо метод для відкриття форми редагування
    console.log(`Редагування користувача з ID: ${userId}`);
    this.addEditUserModalService.openForm(userId); // Використовуйте addEditUserModalService для відкриття форми
  }

  deleteUser(userId: number): void {
    // Викликаємо метод для видалення користувача
    console.log(`Видалення користувача з ID: ${userId}`);
    this.authService.deleteUser(userId).subscribe({
      next: () => {
        console.log(`Користувача з ID: ${userId} видалено успішно`);
        this.loadUsers(this.userFilterService.getCurrentLocation(), this.userFilterService.getCurrentDepartment());
        this.userDeleted.emit();
      },
      error: (error) => {
        console.error('Error deleting user!', error);
      }
    });
  } 
}
