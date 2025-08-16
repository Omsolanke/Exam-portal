import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
    import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userService: UserService, private snack: MatSnackBar) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  formSubmit() {
    if (!this.user.username?.trim()) {
      this.snack.open('⚠️ Username is required!', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log('✅ User registered:', data);
        Swal.fire('Sucessfully done !!', 'User id is '+ data.id, 'success');
        this.snack.open('🎉 Registration successful!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      (error) => {
        console.error('❌ Error registering user:', error);
        this.snack.open('❌ Something went wrong. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    );
  }
}
