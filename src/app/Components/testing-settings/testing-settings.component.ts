import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TestingModel } from '../../../Models/testing.model';
import { TestingService } from '../../Services/testing.service';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from '../category-list/category-list.component';



@Component({
  selector: 'app-testing-settings',
  standalone: true,
  imports: [CommonModule, CategoryListComponent],
  providers: [TestingService],
  templateUrl: './testing-settings.component.html',
  styleUrl: './testing-settings.component.css'
})
export class TestingSettingsComponent {
  private testingId!: number;
  testing!: TestingModel;

  @Output() testingIdOutput = new EventEmitter<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private testingService: TestingService
  ) {}

  ngOnInit(): void {
    // Отримуємо параметр id з маршруту
    this.route.paramMap.subscribe(params => {
      this.testingId = +params.get('id')!;
      console.log('Testing ID:', this.testingId);
      this.getTestingById(this.testingId); // Завантажуємо тестування за ID
      this.testingIdOutput.emit(this.testingId);
    });
  }

  onBackNavClicked(): void {
    this.router.navigate(['admin/test-admin']);
  }
  
  getTestingById(testingId: number): void {
    this.testingService.getTestingById(testingId).subscribe({
      next: (data: TestingModel) => {
        this.testing = data;
        console.log('Fetched testing:', this.testing);
      },
      error: (error) => {
        console.error('Error fetching testing!', error);
      }
    });
  }
}
