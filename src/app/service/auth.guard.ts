import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard {
  constructor(private auth: AuthService , private router: Router) {}

  canActivate(): boolean {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

