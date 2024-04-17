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
    sft: '',
    swt: '',
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

  ngOnInit(): void {}

  async sendTime() {
    this.data.ft = this.time_FT;
    this.data.mb = this.time_MB;
    this.data.phU = this.time_PHU;
    this.data.phD = this.time_PHD;

    let res: any = await this.auth.Post('updateByTime', this.data);
    if (res.status_code == 200) {
      this.auth.Swal('ทำรายการสำเร็จ', 'success');
    } else {
      this.auth.Swal('ทำรายการไม่สำเร็จ', 'error');
    }
    console.log(this.data);
  }
}
