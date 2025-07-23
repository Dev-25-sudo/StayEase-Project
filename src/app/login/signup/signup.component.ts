import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupform: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private auth: Auth) {
    this.signupform = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  async formsubmit() {
    if (this.signupform.invalid) {
      this.error = 'Please fill all fields correctly.';
      this.message = '';
      return;
    }

    const { name, email, password, confirmPassword } = this.signupform.value;

    if (password !== confirmPassword) {
      this.error = 'Passwords do not match.';
      this.message = '';
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      this.message = '✅ Signup successful! You can now log in.';
      this.error = '';
      this.signupform.reset();
    } catch (err: any) {
      this.message = '';
      this.error = err.message || 'Signup failed.';
    }
  }
}


