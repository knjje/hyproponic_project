import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/app/service/auth.service';



@Injectable({
  providedIn: 'root'
})
export class LineMessageService {

  private readonly LINE_ACCESS_TOKEN = 'iU2H524KfuGVWmHTXZHYTsg1haf6QUZc9OfHoW8H7qZ';
  private lineNotifyAPI = 'https://notify-api.line.me/api/notify';



  constructor(private http: HttpClient,private db: AngularFireDatabase,private auth: AuthService,
    ) { }


    sendNotificationAndSaveToDatabase(message: string): void {
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${this.LINE_ACCESS_TOKEN}`
      });
  
      const body = new URLSearchParams();
      body.set('message', message);
  
      // ส่งข้อความไปยัง Line Notify
      this.http.post(this.lineNotifyAPI, body.toString(), { headers }).subscribe(
        response => {
          console.log('Notification sent successfully:', response);
        },
        error => {
          console.error('Error sending notification:', error);
        }
      );
    }


  
}

  

  





    
  

  


