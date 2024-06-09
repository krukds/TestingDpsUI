import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestService } from '../../Services/test.service';
import { AnswerService } from '../../Services/answer.service';
import { TestModel } from '../../../Models/test.model';
import { AnswerModel } from '../../../Models/answer.model';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent],
  providers: [TestService, AnswerService],
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  @Input() categoryId: number | null = null;
  @ViewChild('alertComponent') alertComponent!: AlertComponent;
  tests: TestModel[] = [];
  editingTestId: number | null = null;
  newTestName: string = '';
  answersMap: { [testId: number]: AnswerModel[] } = {};
  isAddingTest: boolean = false;

  constructor(
    private testService: TestService,
    private answerService: AnswerService
  ) {}

  ngOnInit() {
    this.loadTests(this.categoryId);
  }

  loadTests(category_id: number | null): void {
    this.testService.getAllTests(category_id).subscribe({
      next: (data: TestModel[]) => {
        this.tests = data;
        console.log('Fetched tests:', this.tests);
        this.tests.forEach(test => {
          this.loadAnswers(test.id);
        });
      },
      error: (error) => {
        console.error('Error fetching tests!', error);
      }
    });
  }

  loadAnswers(testId: number): void {
    this.answerService.getAllAnswers(testId).subscribe({
      next: (data: AnswerModel[]) => {
        this.answersMap[testId] = data;
        console.log(`Fetched answers for test ${testId}:`, data);
      },
      error: (error) => {
        console.error(`Error fetching answers for test ${testId}!`, error);
      }
    });
  }

  toggleAddTest(): void {
    this.isAddingTest = !this.isAddingTest;
  }

  cancelAddTest(): void {
    this.isAddingTest = false;
    this.newTestName = '';
  }

  addTest(): void {
    if (!this.newTestName.trim()) {
      this.alertComponent.message = 'Назва тесту не може бути порожньою!';
      this.alertComponent.showAlert();
      return;
    }

    this.testService.addTest(this.newTestName, this.categoryId!).subscribe({
      next: (test: TestModel) => {
        this.answerService.addAnswer('Нова відповідь', test.id, false).subscribe({
          next: (answer: AnswerModel) => {
            this.tests.push(test);
            this.answersMap[test.id] = [answer];
            this.newTestName = ''; // Очистити поле вводу для нового тесту
            this.isAddingTest = false;
            console.log('Added new test with one answer:', test, answer);
          },
          error: (error) => {
            console.error('Error adding initial answer!', error);
          }
        });
      },
      error: (error) => {
        console.error('Error adding test!', error);
      }
    });
  }

  editTest(test: TestModel): void {
    this.editingTestId = test.id;
  }

  cancelEdit(): void {
    this.editingTestId = null;
    this.loadTests(this.categoryId); // Перезавантажити тести, щоб скинути зміни
  }

  addAnswer(testId: number): void {
    const newAnswer: AnswerModel = {
      id: 0,
      name: '',
      test_id: testId,
      is_correct: false
    };
    if (!this.answersMap[testId]) {
      this.answersMap[testId] = [];
    }
    this.answersMap[testId].push(newAnswer);
  }

  deleteAnswer(testId: number, answer: AnswerModel): void {
    if (this.answersMap[testId].length === 1) {
      this.alertComponent.message = 'Не можна видалити останню відповідь!';
      this.alertComponent.showAlert();
      return;
    }

    if (answer.id === 0) {
      // If the answer is new and hasn't been saved yet
      const index = this.answersMap[testId].indexOf(answer);
      if (index > -1) {
        this.answersMap[testId].splice(index, 1);
      }
    } else {
      this.answerService.deleteAnswer(answer.id).subscribe({
        next: () => {
          const index = this.answersMap[testId].indexOf(answer);
          if (index > -1) {
            this.answersMap[testId].splice(index, 1);
          }
          console.log(`Deleted answer with id ${answer.id}`);
        },
        error: (error) => {
          console.error(`Error deleting answer with id ${answer.id}!`, error);
        }
      });
    }
  }

  saveTest(test: TestModel): void {
    // Оновити тест
    this.testService.updateTest(test.id, test.name, test.category_id).subscribe({
      next: () => {
        // Оновити відповіді
        const answers = this.answersMap[test.id] || [];
        for (let answer of answers) {
          if (answer.id === 0) {
            this.answerService.addAnswer(answer.name, test.id, answer.is_correct).subscribe({
              next: (addedAnswer) => {
                // Update the newly added answer with its ID from the backend
                answer.id = addedAnswer.id;
                console.log('Added answer:', addedAnswer);
              },
              error: (error) => {
                console.error('Error adding answer!', error);
              }
            });
          } else {
            this.answerService.updateAnswer(answer.id, answer.name, test.id, answer.is_correct).subscribe({
              next: () => {
                console.log('Updated answer:', answer);
              },
              error: (error) => {
                console.error('Error updating answer!', error);
              }
            });
          }
        }
        this.editingTestId = null;
        this.loadTests(this.categoryId); // Перезавантажити тести, щоб відобразити останні зміни
      },
      error: (error) => {
        console.error('Error updating test!', error);
      }
    });
  }

  deleteTest(testId: number): void {
    this.testService.deleteTest(testId).subscribe({
      next: () => {
        this.tests = this.tests.filter(test => test.id !== testId);
        delete this.answersMap[testId];
        console.log(`Deleted test with id ${testId}`);
      },
      error: (error) => {
        console.error(`Error deleting test with id ${testId}!`, error);
      }
    });
  }
}
