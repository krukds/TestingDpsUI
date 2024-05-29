import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor (
    private authService: AuthService,
    private router: Router
  ) {}


  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if(this.username == 'admin') 
          this.router.navigate(['/admin']);
        else 
          this.router.navigate(['/user'])
        
          console.log("logged successfully");
      },
      error: (error) => {
        console.log("log failed");
      }
    });
  }
}
