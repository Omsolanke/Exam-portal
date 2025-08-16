import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { using } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
     CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private snack: MatSnackBar, private login:LoginService, private router: Router) {}

  loginData = {
    username: '',
    password: ''
  };

  formSubmit() {
    if (!this.loginData.username.trim() || !this.loginData.password.trim()) {
      this.snack.open('⚠️ Username and password are required!', 'Close', {
        duration: 3000,
      });
      return;
    }
debugger
  // request to server to generate token

 this.login.generateToken(this.loginData).subscribe(
  (data: any) => {
    console.log('sucess');
    console.log(data);

    //login..
    this.login.loginUser(data.token);

   this.login.getCurrentUser().subscribe((user: any) => {
  this.login.setUser(user);
  console.log(user);

  const userRole = user.authorities[0]?.authority;

  if (userRole === 'ADMIN') {
    this.router.navigate(['/admin']);
  } else if (userRole === 'NORMAL') {
    this.router.navigate(['/user-dashboard/0']);
  } else {
    this.login.logout();
  }

  
});

  },
  (error) => {
   console.log('Error');
   console.log(error);
   this.snack.open('Invalid Details !! Try again ','',{
    duration: 3000,
   })
  }
  );
  }

}
