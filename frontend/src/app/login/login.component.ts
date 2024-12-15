import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password: string = "";
  emailaddress: string = "";
  usernameInput: boolean = false;
  passwordInput: boolean = false;
  missingLoginDetails: boolean = true;
  activatePasswordResetModal: boolean = false;

  constructor(private authService: AuthService,  private router: Router) {}

  onSubmit() {
    if (this.emailaddress.length === 0 || this.password.length === 0) {
      return;
    } else if (this.emailaddress.length !== 0 && this.password.length !== 0) {
      this.authService.login(this.emailaddress, this.password).subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.log(err);
        },
      })
    }
    this.missingLoginDetails = true;
  }    
}
