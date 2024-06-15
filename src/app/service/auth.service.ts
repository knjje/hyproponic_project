import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from 'firebase/auth';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  time_FT: any;
  loggedIn: boolean = false;

  sprinker_FT: any;
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}



  //login
    login(email: string, password: string) {
      this.fireauth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        this.router.navigate(['/home']);
        console.log(user);
        this.loggedIn = true;
      })
      .catch((error) => {
        this.loggedIn = true;
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
        if (errorMessage == 'Firebase: Error (auth/missing-email).') {
                  this.Swal('กรุณากรอกอีเมลให้ถูกต้อง', 'error');
                } else if (
                  errorMessage ==
                  'Firebase: The email address is badly formatted. (auth/invalid-email).'
                ) {
                  this.Swal('กรุณากรอกอีเมลให้ถูกต้อง', 'error');
                } else if (
                  errorMessage ==
                  'Firebase: The supplied auth credential is incorrect, malformed or has expired. (auth/invalid-credential).'
                ) {
                  this.Swal('ไม่สามารถเข้าสู่ระบบได้', 'error');
                } else if (
                  errorMessage ==
                  'Firebase: A non-empty password must be provided (auth/missing-password).'
                ) {
                  this.Swal('กรุณากรอกรหัสผ่าน', 'error');
                } else if (
                  errorMessage ==
                  'Firebase: This operation is restricted to administrators only. (auth/admin-restricted-operation).'
                ) {
                  this.Swal('กรุณากรอกข้อมูล', 'error');
                }
                this.router.navigate(['/login']);
      });
    }
  // login(email: string, password: string) {
  //   this.fireauth.signInWithEmailAndPassword(email, password).then(
  //     () => {
  //       localStorage.setItem('token', 'true');
  //       this.router.navigate(['/home']);
  //     },
  //     (err) => {
  //       let msg = err.message;
  //       console.log(msg);
  //       if (msg == 'Firebase: Error (auth/missing-email).') {
  //         this.Swal('กรุณากรอกอีเมลให้ถูกต้อง', 'error');
  //       } else if (
  //         msg ==
  //         'Firebase: The email address is badly formatted. (auth/invalid-email).'
  //       ) {
  //         this.Swal('กรุณากรอกอีเมลให้ถูกต้อง', 'error');
  //       } else if (
  //         msg ==
  //         'Firebase: The supplied auth credential is incorrect, malformed or has expired. (auth/invalid-credential).'
  //       ) {
  //         this.Swal('ไม่สามารถเข้าสู่ระบบได้', 'error');
  //       } else if (
  //         msg ==
  //         'Firebase: A non-empty password must be provided (auth/missing-password).'
  //       ) {
  //         this.Swal('กรุณากรอกรหัสผ่าน', 'error');
  //       } else if (
  //         msg ==
  //         'Firebase: This operation is restricted to administrators only. (auth/admin-restricted-operation).'
  //       ) {
  //         this.Swal('กรุณากรอกข้อมูล', 'error');
  //       }
  //       this.router.navigate(['/login']);
  //     }
  //   );
  // }

  //register
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        this.Swal('สร้างบัญชีสำเร็จ', 'success');
        this.router.navigate(['/login']);
      },
      (err) => {
        let msg = err.message;
        console.log(msg);
        if (msg == 'Firebase: Error (auth/missing-email).') {
          this.Swal('กรุณากรอกอีเมลให้ถูกต้อง', 'error');
        } else if (
          msg ==
          'Firebase: The email address is badly formatted. (auth/invalid-email).'
        ) {
          this.Swal('กรุณากรอกอีเมลให้ถูกต้อง', 'error');
        } else if (
          msg ==
          'Firebase: Password should be at least 6 characters (auth/weak-password).'
        ) {
          this.Swal('กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัว', 'error');
        } else if (
          msg ==
          'Firebase: A non-empty password must be provided (auth/missing-password).'
        ) {
          this.Swal('กรุณากรอกรหัสผ่าน', 'error');
        } else if (
          msg ==
          'Firebase: This operation is restricted to administrators only. (auth/admin-restricted-operation).'
        ) {
          this.Swal('กรุณากรอกข้อมูล', 'error');
        }
        this.router.navigate(['/register']);
      }
    );
  }

  //logout
  logout() {
    this.fireauth.signOut().then(
      () => {
        this.loggedIn = false;
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  //get data มาดู
  humidityValue() {
    return this.db.object('Humidity').valueChanges();
  }
  temperatureValue() {
    return this.db.object('Temperature').valueChanges();
  }
  pHValue() {
    return this.db.object('pHValue').valueChanges();
  }
  waterStateLow() {
    return this.db.object('waterstatelow').valueChanges();
  }
  waterStateHigh() {
    return this.db.object('waterstatehigh').valueChanges();
  }
  timeSFT() {
    return this.db.object('timeSFT').valueChanges();
  }
  timeSWT() {
    return this.db.object('timeSWT').valueChanges();
  }
  timeFT() {
    return this.db.object('timeFT').valueChanges();
  }
  timeMB() {
    return this.db.object('timeMB').valueChanges();
  }
  timePHU() {
    return this.db.object('timePHU').valueChanges();
  }
  timePHD() {
    return this.db.object('timePHD').valueChanges();
  }


  async Swal(title: any, icon: any, text = '', callback = '', color = '') {
    await Swal.fire({
      title: `<b style="color:${color};" class="fs-3">${title}</b>`,
      text: text,
      reverseButtons: true,
      showCloseButton: true,
      confirmButtonColor: '#00C514',
      icon: icon,
      confirmButtonText: 'ยืนยัน',
      customClass: {
        // actions: 'my-actions',
        confirmButton: 'alert-btn-confirm',
      },
    }).then(async (result) => {
      if (callback) {
        window.location.href = `./${callback}`;
      }
    });
  }


  async Post(path: any, data: any, paramHeader = null): Promise<any> {
    const body = data;

    try {
      const response = await this.http
        .post<any>(`${environment.endpoint}${path}`, body)
        .subscribe();
      return response;
    } catch (error) {
      console.error('An error occurred:', error);
      return false;
    }
  }

  async Get(path: any) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.endpoint}${path}`).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          resolve(false);
        }
      );
    });
  }

  private sidebarVisibilitySubject = new BehaviorSubject<boolean>(false);
  sidebarVisibility$ = this.sidebarVisibilitySubject.asObservable();

  toggleSidebar() {
    this.sidebarVisibilitySubject.next(!this.sidebarVisibilitySubject.value);
  }
}
