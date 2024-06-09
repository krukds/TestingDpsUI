import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestingService } from '../../Services/testing.service';
import { TestingModel } from '../../../Models/testing.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testing-drop-down',
  standalone: true,
  imports: [CommonModule],
  providers: [TestingService],
  templateUrl: './testing-drop-down.component.html',
  styleUrl: './testing-drop-down.component.css'
})
export class TestingDropDownComponent implements OnInit {
  testings: TestingModel[] | null = null;
  @Input() selectedTestingId: number | null = null;
  @Output() testingSelected = new EventEmitter<number | null>(); 

  constructor(private testingService: TestingService) {}

  ngOnInit() {
    this.getTestings();
  }

  getTestings() {
    this.testingService.getAllTestings().subscribe(
      (testings) => {
        this.testings = testings;
      },
      (error) => {
        console.error('Error fetching testings:', error);
      }
    );
  }

  onSelectTesting(event: Event) {
    const target = event.target as HTMLSelectElement;
    const testingName = target.value;

    if (testingName === '') {
      this.testingSelected.emit(null); 
    } else {
      const location = this.testings?.find((testing) => testing.name === testingName);
      if (location) {
        this.testingSelected.emit(location.id);
      }
    }
  }
}
