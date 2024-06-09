import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DepartmentService } from '../../Services/department.service';
import { CommonModule } from '@angular/common';
import { Department } from '../../../Models/department.model';


@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule],
  providers: [DepartmentService],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent {
  departments: Department[] | null = null;
  @Input() selectedDepartmentId: number | null = null;

  @Output() departmentSelected = new EventEmitter<number | null>(); // Тепер передаємо ідентифікатор локації

  constructor (
    private departmentService: DepartmentService
  ){}

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    }, (error) => {
      console.error('Error fetching departments:', error);
    });
  }



  onSelectDepartment(event: Event) {
    const target = event.target as HTMLSelectElement;
    const departmentName = target.value;

    if (departmentName === '') {
      this.departmentSelected.emit(null); // Якщо вибрана опція "Всі", передаємо null
    } else {
      const location = this.departments?.find((loc) => loc.name === departmentName);
      if (location) {
        this.departmentSelected.emit(location.id);
      }
    }
  }
  
}
