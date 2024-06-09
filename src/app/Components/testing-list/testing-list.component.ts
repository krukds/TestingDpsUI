import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TestingModel } from '../../../Models/testing.model';
import { AddEditTestingModalService } from '../../Services/add-edit-testing-modal.service';
import { TestingService } from '../../Services/testing.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-testing-list',
  standalone: true,
  imports: [CommonModule],
  providers: [TestingService],
  templateUrl: './testing-list.component.html',
  styleUrl: './testing-list.component.css'
})
export class TestingListComponent implements OnInit {
  testings: TestingModel[] = [];
  @Output() testingDeleted = new EventEmitter<void>();

  constructor(
    private testingService: TestingService,
    private addEditTestingModalService: AddEditTestingModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTestings();  
  }

  loadTestings(): void {
    this.testingService.getAllTestings().subscribe({
      next: (data: TestingModel[]) => {
        this.testings = data;
        console.log('Fetched testings:', this.testings)
      },
      error: (error) => {
        console.error('Error fetching testings!', error);
      }
    });
  }

  editTesting(testingId: number): void {
    console.log(`Редагування тестування з ID: ${testingId}`);
    this.addEditTestingModalService.openForm(testingId); 
  }

  deleteTesting(testingId: number): void {
    console.log(`Видалення тестування з ID: ${testingId}`);
    this.testingService.deleteTesting(testingId).subscribe({
      next: () => {
        console.log(`Тестування з ID: ${testingId} видалено успішно`);
        this.loadTestings();
        this.testingDeleted.emit();
      },
      error: (error) => {
        console.error('Error deleting testing!', error);
      }
    });
  } 

  settingTesting(testingId: number): void {
    this.router.navigate(['admin/testing-settings', testingId]);
  }
}

