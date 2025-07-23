import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginform: FormGroup;
  private test = inject(Auth);
  credentialerror: boolean = false;
  credentialfail: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private auth2: Auth,
    private rt: Router
  ) {
    this.loginform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  formsubmit() {
    console.log(this.loginform.value);
    console.log(this.loginform);
  }

  ngOnInit() {
    console.log('Firebase Auth:', this.auth2);
  }

  formSubmit() {
    let email = this.loginform.get('email')?.value;
    let password = this.loginform.get('password')?.value;

    this.auth.login(email, password)
    
  .then(user => {
    if (this.auth.isAdmin()) {
      this.rt.navigate(['/admin']);
    } else {
      this.rt.navigate(['/dashboard']);
    }
  })

  .catch(err => {
    this.credentialerror = true;
    this.credentialfail = "Incorrect password ! Please try again.";
  });
  }
}
