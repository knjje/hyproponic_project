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
  };

  constructor(private auth: AuthService, private db: AngularFireDatabase) {}

  async ngOnInit(): Promise<void> {
    await this.getdata();
    await this.getTime();
    console.log(this.sw);
    console.log(this.sf);
    
  }

  reset() {
    this.sf = 0;
    this.sw = 0;
  }

  async resetWT(){
    this.time_WT=''

    this.db
    .object('timeSWT')
    .set(this.time_WT)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );
    let res: any = await this.auth.Get('resetSWT');
  }

  async resetFT(){
    this.time_FT=''

    this.db
    .object('timeSFT')
    .set(this.time_FT)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );
    let res: any = await this.auth.Get('resetSFT');
  }

  async sendTime() {
    this.data.sft = this.time_FT;
    this.data.swt = this.time_WT;

    this.db
    .object('timeSFT')
    .set(this.time_FT)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );

    this.db
    .object('timeSWT')
    .set(this.time_WT)
    .then(() => console.log('set time success'))
    .catch((error) =>
      console.error('Error updating value in Firebase:', error)
    );

    let res: any = await this.auth.Post('updateCronSprinker', this.data);
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

    let qwater = this.db
      .object('quantitysprinklerwater')
      .valueChanges();
      qwater.subscribe((state: any) => {
      this.sw = state;
    });

    let qfer = this.db
      .object('quantitysprinklerfertilizers')
      .valueChanges();
      qfer.subscribe((state: any) => {
      this.sf = state;
    });
  }

  getTime() {
    this.auth.timeSFT().subscribe((time: any) => {
      this.time_FT = time;
    });

    this.auth.timeSWT().subscribe((time: any) => {
      this.time_WT = time;
    });
  }

  async submit() {
      this.auth.Swal('กำลังเปิดที่พ่น', 'success');
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
  }

  SF(value: any) {
    if (value === 250) {
      this.sf = 13;
    } else if (value === 500) {
      this.sf = 26;
    } else {
      this.sf = 0;
    }
  }

  SW(value: any) {
    if (value === 250) {
      this.sw = 13;
    } else if (value === 500) {
      this.sw = 26;
    } else {
      this.sw = 0;
    }
  }

  openWater(state: any) {
    this.openWT = state;
    this.db.object('relaystate/sprinklerwater').set(this.openWT);
  }

  openFer(state: any) {
    this.openFT = state;
    this.db.object('relaystate/sprinklerfertilizers').set(this.openFT);
  }
  
}
