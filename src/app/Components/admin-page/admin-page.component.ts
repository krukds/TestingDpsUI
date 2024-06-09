import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet, Router } from '@angular/router';

import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, RouterOutlet],
  providers: [AuthService],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.clearToken();
    this.authService.clearName();
    this.router.navigate(['/']);
  }
}
