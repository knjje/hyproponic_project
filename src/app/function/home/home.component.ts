import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LineMessageService } from 'src/app/service/line-message.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  humidityValue: any;
  temperatureValue: any;
  pHValue: any;
  waterStateHigh: any;
  waterStateLow: any;
  pump_ph_down: any;
  pump_ph_up: any;
  pump_water_up: any;
  sprinklerfertilizers: any;
  sprinklerwater: any;

  constructor(
    private auth: AuthService,
    private db: AngularFireDatabase,
    private lineMessageService: LineMessageService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getdata();
  }

  logout() {
    this.auth.logout();
  }

  async getdata() {
    await this.auth.humidityValue().subscribe((value: any) => {
      this.humidityValue = parseFloat(value.toFixed(2));
    });
    await this.auth.temperatureValue().subscribe((value: any) => {
      this.temperatureValue = parseFloat(value.toFixed(2));
    });
    await this.auth.pHValue().subscribe((value: any) => {
      this.pHValue = value;
    });
    await this.auth.waterStateHigh().subscribe((state: any) => {
      this.waterStateHigh = state;
    });
    await this.auth.waterStateLow().subscribe((state: any) => {
      this.waterStateLow = state;
    });
  }

  updateSwitchState(switchId: string, state: boolean) {
    const switchElement = document.getElementById(switchId) as HTMLInputElement;
    if (switchElement) {
      switchElement.checked = state;
    }
  }

  testnoti(): void {
    const message = 'สวัสดี';
    this.lineMessageService.sendNotificationAndSaveToDatabase(message);
  }

  openRelay() {
    window.location.href = '/relay'
  }
  openQuantity() {
    window.location.href = '/quantity'
  }
  openSprinker() {
    window.location.href = '/sprinker'
  }
  openSetTime() {
    window.location.href = '/set-time'
  }
}
