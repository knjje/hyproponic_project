import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-setting-time',
  templateUrl: './setting-time.component.html',
  styleUrls: ['./setting-time.component.css'],
})
export class SettingTimeComponent implements OnInit {
  data: any = {
    ft: '',
    mb: '',
    phU: '',
    phD: '',
  };
  time_FT: any = '';
  time_MB: any = '';
  time_PHD: any = '';
  time_PHU: any = '';

  constructor(private auth: AuthService, private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.getTime()
  }

  async sendTime() {
    this.data.ft = this.time_FT;
    this.data.mb = this.time_MB;
    this.data.phU = this.time_PHU;
    this.data.phD = this.time_PHD;

    this.db
    .object('timeFT')
    .set(this.time_FT)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );

    this.db
    .object('timeMB')
    .set(this.time_MB)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );

    this.db
    .object('timePHU')
    .set(this.time_PHU)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );

    this.db
    .object('timePHD')
    .set(this.time_PHD)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );

    let res: any = await this.auth.Post('updateCron', this.data);
    console.log(this.data);
  }


  getTime() {
    this.auth.timeFT().subscribe((time: any) => {
      this.time_FT = time;
    });
    this.auth.timeMB().subscribe((time: any) => {
      this.time_MB = time;
    });
    this.auth.timePHU().subscribe((time: any) => {
      this.time_PHU = time;
    });
    this.auth.timePHD().subscribe((time: any) => {
      this.time_PHD = time;
    });
  }
}
