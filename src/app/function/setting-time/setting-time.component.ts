import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-setting-time',
  templateUrl: './setting-time.component.html',
  styleUrls: ['./setting-time.component.css'],
})
export class SettingTimeComponent implements OnInit {
  time_FT: any = '';
  time_MB: any = '';
  time_PHD: any = '';
  time_PHU: any = '';

  constructor(private auth: AuthService, private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.getTime()
  }
  

  async resetFT(){
    this.time_FT=''

    this.db
    .object('timeFT')
    .set(this.time_FT)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );
    let res: any = await this.auth.Get('resetFT');
  }

  async resetMB(){
    this.time_MB=''

    this.db
    .object('timeMB')
    .set(this.time_MB)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );
    let res: any = await this.auth.Get('resetMB');
  }

  async resetPHU(){
    this.time_PHU=''

    this.db
    .object('timePHU')
    .set(this.time_PHU)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );
    let res: any = await this.auth.Get('resetPHU');
  }

  async resetPHD(){
    this.time_PHD=''

    this.db
    .object('timePHD')
    .set(this.time_PHD)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );
    let res: any = await this.auth.Get('resetPHD');
  }


  async sendTimeFT(){
    let bodyFT = {ft:''}
    bodyFT.ft = this.time_FT
    this.db
    .object('timeFT')
    .set(this.time_FT)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );
    let res: any = await this.auth.Post('updateFT', bodyFT);
  }

  async sendTimeMB(){
    let bodyMB = {mb:''}
    bodyMB.mb = this.time_MB
    this.db
    .object('timeMB')
    .set(this.time_MB)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );
    let res: any = await this.auth.Post('updateMB', bodyMB);

  }

  async sendTimePHU(){
    let bodyPHU = {phU:''}
    bodyPHU.phU = this.time_PHU
    this.db
    .object('timePHU')
    .set(this.time_PHU)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );
    let res: any = await this.auth.Post('updatePhU', bodyPHU);

  }

  async sendTimePHD(){
    let bodyPHD = {phD:''}
    bodyPHD.phD = this.time_PHD
    this.db
    .object('timePHD')
    .set(this.time_PHD)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );
    let res: any = await this.auth.Post('updatePhD', bodyPHD);

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
