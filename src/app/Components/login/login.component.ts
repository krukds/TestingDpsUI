import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { AuthService } from '../../Services/auth.service';
import { AlertComponent } from '../alert/alert.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  @ViewChild('alertComponent') alertComponent!: AlertComponent;


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
        this.alertComponent.message = 'Неправильний е-мейл або пароль!'
        this.alertComponent.showAlert();
      }
    });
  }
}
