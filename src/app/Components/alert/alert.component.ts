import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string = '';
  isVisible: boolean = false;

  showAlert() {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 3000); // 3000 мс = 3 секунди
  }
}
