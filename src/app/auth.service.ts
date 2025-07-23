import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { authState } from 'rxfire/auth';
import { signOut } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();
  private adminEmail = 'admin@example.com'; 

  constructor(private auth: Auth) {
    authState(this.auth).subscribe((user) => {
      this.userSubject.next(user);
    });
  }

  login(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(this.auth, email, password).then((cred) => {
      const user = cred.user;
      this.userSubject.next(user);  
      return user;
    });
  }

    logout() {
    return signOut(this.auth).then(() => {
      this.userSubject.next(null); 
      console.log('Logged out successfully');
    }).catch(err => console.error('Logout error:', err));
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  isAdmin(): boolean {
    const user = this.userSubject.value;
    return user?.email === this.adminEmail;
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }
}
