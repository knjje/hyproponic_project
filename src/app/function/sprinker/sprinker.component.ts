import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sprinker',
  templateUrl: './sprinker.component.html',
  styleUrls: ['./sprinker.component.css'],
})
export class SprinkerComponent implements OnInit {
  sf: any = 0;
  sw: any = 0;
  setTimeFT: any;
  sprinker_FT: any;
  sprinker_WT: any;
  openFT: any;
  openWT: any;
  time_FT: any = '';
  time_WT: any = '';
  endTimeFromDatabase: any = new Date().getTime();
  data: any = {
    sft: '',
    swt: '',
    ft: '',
    mb: '',
    phU: '',
    phD: '',
  };

  constructor(private auth: AuthService, private db: AngularFireDatabase) {}

  async ngOnInit(): Promise<void> {
    await this.getdata();
    await this.getTime();
  }

  reset() {
    this.sf = 0;
    this.sw = 0;
  }

  calTime(time_FT: any) {
    console.log(time_FT);
    const setTime = new Date();
    const timeArray = this.time_FT.split(':');
    setTime.setHours(parseInt(timeArray[0]));
    setTime.setMinutes(parseInt(timeArray[1]));
    const setTimeMilliseconds = setTime.getTime();
    const timeDifference =
      this.auth.calculateTimeDifference(setTimeMilliseconds);
    console.log('Time difference:', timeDifference);
  }

  async sendTime() {
    this.data.sft = this.time_FT;
    this.data.swt = this.time_WT;

    let res: any = await this.auth.Post('updateByTime', this.data);
    if (res.status_code == 200) {
      this.auth.Swal('ทำรายการสำเร็จ', 'success');
    } else {
      this.auth.Swal('ทำรายการไม่สำเร็จ', 'error');
    }
    console.log(this.data);
  }

  getdata() {
    let sprinklerfertilizers = this.db
      .object('relaystate/sprinklerfertilizers')
      .valueChanges();
    sprinklerfertilizers.subscribe((state: any) => {
      this.openFT = state;
    });

    let sprinklerwater = this.db
      .object('relaystate/sprinklerwater')
      .valueChanges();
    sprinklerwater.subscribe((state: any) => {
      this.openWT = state;
    });
  }

  getTime() {
    this.auth.timeFT().subscribe((time: any) => {
      this.time_FT = time;
      console.log(time);
      this.auth.startCountdown(time, this.sprinker_FT);
    });
  }

  updateSwitchState(switchId: string, state: boolean) {
    const switchElement = document.getElementById(switchId) as HTMLInputElement;
    if (switchElement) {
      switchElement.checked = state;
    }
  }

  startTimer() {
    this.db
      .object('timeFT')
      .set(this.time_FT)
      .then(() => console.log('set time success'))
      .catch((error) =>
        console.error('Error updating value in Firebase:', error)
      );
  }

  sprinklerfertilizers(event: any) {
    this.db.object('relaystate/sprinklerfertilizers').set(event.target.checked);
  }

  sprinklerwater(event: any) {
    this.db.object('relaystate/sprinklerwater').set(event.target.checked);
  }

  async submit() {
    await Swal.fire({
      title: `<b style="color='#000000'" class="fs-3">กดยืนยันเพื่อเติมสารเข้าถังน้ำ</b>`,
      imageUrl: 'assets/icons/delAlert.png',
      reverseButtons: true,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#00C514',
      cancelButtonColor: '#F24E1E',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      customClass: {
        cancelButton: 'alert-btn-cancel',
        confirmButton: 'alert-btn-confirm',
      },
    }).then(async (result) => {
      this.auth.Swal('กำลังเติมสารเข้าถังน้ำ', 'success');
      this.db
        .object('quantitysprinklerfertilizers')
        .set(this.sf)
        .then(() => console.log('finish update value'))
        .catch((error) =>
          console.error('Error updating value in Firebase:', error)
        );

      this.db
        .object('quantitysprinklerwater')
        .set(this.sw)
        .then(() => console.log('finish update value'))
        .catch((error) =>
          console.error('Error updating value in Firebase:', error)
        );
    });
  }

  SF(value: any) {
    if (value === 250) {
      this.sf = 13;
    } else if (value === 500) {
      this.sf = 26;
    } else {
      this.sf = 0;
    }
    console.log(this.sf);
  }

  SW(value: any) {
    if (value === 250) {
      this.sw = 13;
    } else if (value === 500) {
      this.sw = 26;
    } else {
      this.sw = 0;
    }
    console.log(this.sw);
  }

  openWater(state: any) {
    console.log(state);
    this.openWT = state;
    console.log(this.openWT);

    this.db.object('relaystate/sprinklerwater').set(this.openWT);
  }

  openFer(state: any) {
    console.log(state);
    
    this.openFT = state;
    console.log(this.openFT);

    this.db.object('relaystate/sprinklerfertilizers').set(this.openFT);
  }
}
