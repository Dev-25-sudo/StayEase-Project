import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule], 
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  forgotpasswordform: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private auth: Auth) {
    this.forgotpasswordform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async formsubmit() {
    if (this.forgotpasswordform.invalid) {
      this.error = 'Please enter a valid email address.';
      this.message = '';
      return;
    }

    const email = this.forgotpasswordform.value.email;

    try {
      await sendPasswordResetEmail(this.auth, email);
      this.message = 'Email sent successfully. Please check your inbox.';
      this.error = '';
      this.forgotpasswordform.reset();
    } catch (err: any) {
      this.message = '';
      if (err.code === 'auth/user-not-found') {
        this.error = 'No user found with this email.';
      } else if (err.code === 'auth/invalid-email') {
        this.error = 'Invalid email format.';
      } else {
        this.error = err.message || 'Something went wrong.';
      }
    }
  }
}

