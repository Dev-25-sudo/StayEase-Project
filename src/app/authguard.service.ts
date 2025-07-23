import { Injectable } from '@angular/core';
import {  CanActivate ,Router} from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { authState } from 'rxfire/auth';
import {map,take} from "rxjs/operators";

 


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private rt :Router ,private auth :Auth) { }
 
  canActivate() {
    return authState(this.auth).pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        } else {
          this.rt.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
