import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-relay',
  templateUrl: './relay.component.html',
  styleUrls: ['./relay.component.css'],
})
export class RelayComponent {
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
  Pwater: any;
  Led: any;
  Fan: any;
  PhD: any;
  PhU: any;
  FT: any;
  MB: any;
  constructor(private auth: AuthService, private db: AngularFireDatabase) {}

  async ngOnInit(): Promise<void> {
    this.getData();
    this.getDataFromRD();
  }

  getData() {




    let pumpStirring = this.db.object('relaystate/pumpStirring').valueChanges();
    pumpStirring.subscribe((state: any) => {
      this.updateSwitchState('pumpStirring', state);
    });

    let pumpUP = this.db.object('relaystate/pumpUP').valueChanges();
    pumpUP.subscribe((state: any) => {
      this.updateSwitchState('pumpUP', state);
    });





    let valve = this.db.object('relaystate/valve').valueChanges();
    valve.subscribe((state: any) => {
      this.updateSwitchState('valve', state);
    });
  }


  getDataFromRD(){
    let fan = this.db.object('relaystate/fan').valueChanges();
    fan.subscribe((state: any) => {
      this.Fan = state;
    });

    let led = this.db.object('relaystate/led').valueChanges();
    led.subscribe((state: any) => {
      this.Led = state;
    });

    let pumpwater = this.db.object('relaystate/pumpwater').valueChanges();
    pumpwater.subscribe((state: any) => {
      this.Pwater = state;
    });

    
    let pumpphDown = this.db.object('relaystate/pumpphDown').valueChanges();
    pumpphDown.subscribe((state: any) => {
      this.PhD = state
    });

    let pumpphUP = this.db.object('relaystate/pumpphUP').valueChanges();
    pumpphUP.subscribe((state: any) => {
      this.PhU = state
    });

    let fertilizers = this.db.object('relaystate/fertilizers').valueChanges();
    fertilizers.subscribe((state: any) => {
      this.FT = state
    });

    let microbial = this.db.object('relaystate/microbial').valueChanges();
    microbial.subscribe((state: any) => {
      this.MB = state
    });

    
  }

  updateSwitchState(switchId: string, state: boolean) {
    const switchElement = document.getElementById(switchId) as HTMLInputElement;
    if (switchElement) {
      switchElement.checked = state;
    }
  }


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

  openPwater(state: any) {
    this.Pwater = state;
    this.db.object('relaystate/pumpwater').set(this.Pwater);
  }

  openFan(state: any) {
    this.Fan = state;
    this.db.object('relaystate/fan').set(this.Fan);
  }

  openLed(state: any) {
    this.Led = state;
    this.db.object('relaystate/led').set(this.Led);
  }

  openFT(state: any) {
    this.FT = state;
    this.db.object('relaystate/fertilizers').set(this.FT);
  }

  openMB(state: any) {
    this.MB = state;
    this.db.object('relaystate/microbial').set(this.MB);
  }

  openPhU(state: any) {
    this.PhU = state;
    this.db.object('relaystate/pumpphUP').set(this.PhU);
  }

  openPhD(state: any) {
    this.PhD = state;
    this.db.object('relaystate/pumpphDown').set(this.PhD);
  }
}
