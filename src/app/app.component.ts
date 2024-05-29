import { Component } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Components/home/home.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, HomeComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TestingDpsUI';
}
