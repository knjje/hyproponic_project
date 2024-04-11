import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import { AlertComponent } from '../outlet/alert/alert.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private apiUrl = environment.apiUrl;
  time_FT: any;
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
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['home']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  //register
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('Register Successful');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  //logout
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
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
  timeFT() {
    return this.db.object('timeFT').valueChanges();
  }

  startCountdown(endTime: any, sprinker_FT: any): void {
    console.log(sprinker_FT);
    console.log(endTime);
  
    const setTime = new Date();
    const timeArray = endTime.split(':'); // แยกชั่วโมงและนาที
    setTime.setHours(parseInt(timeArray[0])); // กำหนดชั่วโมง
    setTime.setMinutes(parseInt(timeArray[1])); // กำหนดนาที
  
    // เวลาปัจจุบันในมิลลิวินาที
    const currentMilliseconds = new Date().getTime();
    // คำนวณเวลาที่เหลือจนถึงเวลาที่ตั้ง
    let timeDifference = setTime.getTime() - currentMilliseconds;
  
    console.log('setTimeMilliseconds', timeArray);
    console.log('currentMilliseconds', currentMilliseconds);
    console.log('timeDifference', timeDifference);
    if (timeDifference > 0) {
      this.db
        .object('difFT')
        .set(timeDifference)
        .then(() => console.log('set time success'))
        .catch((error) =>
          console.error('Error updating value in Firebase:', error)
        );
  
      const countdownInterval = setInterval(() => {
        timeDifference -= 1000; // ลดค่า difFT ทีละ 1 วินาที
        if (timeDifference <= 0) {
          clearInterval(countdownInterval); // หยุดการนับถอยหลังเมื่อ difFT เหลือ 0 หรือน้อยกว่า
          this.db.object('relaystate/sprinklerfertilizers').set(!sprinker_FT);
        } else {
          this.db.object('difFT').set(timeDifference); // อัปเดตค่า difFT ใน Firebase
        }
      }, 1000);
    } else {
      this.db.object('relaystate/sprinklerfertilizers').set(sprinker_FT);
    }
  }

  async Swal(title: any, icon: any, text = '', callback = '', color = '') {
    await Swal.fire({
      title: `<b style="color:${color};" class="fs-3">${title}</b>`,
      text: text,
      confirmButtonText: 'ตกลง',
      confirmButtonColor: '#19c82a',
      showConfirmButton: true,
      showCloseButton: true,
      icon: icon,
      customClass: {
        // actions: 'my-actions',
        cancelButton: 'reset',
        confirmButton: 'submit',
      },
    }).then((result: any) => {
      if (callback) {
        window.location.href = `./${callback}`;
      }
    });
  }

  alertPopUp({
    title = '',
    text = '',
    status = '',
    redirectLink = null,
    textButton = 'เสร็จสิ้น',
    cancleButton = false,
    confirmButton = false,
    cancleButtonText = 'ยกเลิก',
    width = 40,
  }) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: `${width}vw`,
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.componentInstance.data = {
      title: title,
      text: text,
      status: status,
      textButton: textButton,
      cancleButton: cancleButton,
      confirmButton: confirmButton,
      cancleButtonText: cancleButtonText,
    };

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result.isResult) {
        if (redirectLink) {
          window.location.href = `./${redirectLink}`;
        }
      }
    });
  }

  async Post(data: any, paramHeader = null) {
    return new Promise((resolve, reject) => {
      const body = {
        FormData: {
          Data: data,
          Date: null,
          SessionId: null,
        },
      };

      this.http.post<any>(`${this.apiUrl}/data`, data).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          resolve(false);
        }
      );
    });
  }

  async Get(path: any) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.apiUrl}/data`).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          resolve(false);
        }
      );
    });
  }

  calculateTimeDifference(savedTime: number): number {
    const currentTime = new Date().getTime();
    return savedTime - currentTime;
  }
}
