import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Chart, registerables } from 'chart.js';@Component({
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

  constructor(
    private auth: AuthService,
    private db: AngularFireDatabase,
  ) {
    Chart.register(...registerables);
  }

  async ngOnInit(): Promise<void> {
    await this.getdata();
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Temperature in °C',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 2,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
          },
          {
            label: 'Humidity in %',
            data: [30, 50, 20, 40, 60, 70],
            borderWidth: 2,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: false,
          },
          {
            label: 'Humidity in %',
            data: [2, 8, 6, 5, 8, 7],
            borderWidth: 2,
            borderColor: 'rgba(13, 102, 255, 1)',
            backgroundColor: 'rgba(13, 102, 255, 0.2)',
            fill: false,
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
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
  addgroup() {
    window.location.href = '/set-time'
  }
}
