import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe],
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
  data: any = [];
  tempChart: any;
  humiChart: any;
  phChart: any;
  body: any = {
    startDate: null,
    // endDate: null,
  };
  constructor(
    private auth: AuthService,
    private db: AngularFireDatabase,
    private datePipe: DatePipe
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getdata();
    this.getLog();
    this.test();
  }

  async test() {
    try {
      let res: any = await this.auth.Get('getLog');
      this.data = res.data;
      this.createCharts();
    } catch (error) {
      console.error('Error fetching log data:', error);
    }
  }

  async getLog(): Promise<void> {
    if (!this.body.startDate) {
      this.body.startDate = new Date();
      this.body.startDate = this.datePipe.transform(
        this.body.startDate,
        'yyyy-MM-dd'
      );
    } else if (this.body.startDate instanceof Date) {
      this.body.startDate = this.datePipe.transform(
        this.body.startDate,
        'yyyy-MM-dd'
      );
    }

    console.log('Formatted Date Range:', this.body);
    try {
      let res: any = await this.auth.Post('filLog', this.body);
      console.log('Response from API:', res);

      this.data = res.data; // Assuming res contains the entire response object with data property
      this.createCharts();
    } catch (error) {
      console.error('Error fetching log data:', error);
    }
  }

  createCharts(): void {
    const timestamps = this.data.map((item: any) =>
      this.formatTimestamp(item.timestamp)
    );
    const temperatures = this.data.map((item: any) => item.temperature);
    const humidities = this.data.map((item: any) => item.humidity);
    const phValues = this.data.map((item: any) => item.ph);

    this.tempChart = this.createChart(
      'temp',
      'Temperature in °C',
      timestamps,
      temperatures,
      'rgba(75, 192, 192, 1)'
    );
    this.humiChart = this.createChart(
      'humi',
      'Humidity in %',
      timestamps,
      humidities,
      'rgba(54, 162, 235, 1)'
    );
    this.phChart = this.createChart(
      'ph',
      'pH Level',
      timestamps,
      phValues,
      'rgba(255, 99, 132, 1)'
    );
  }

  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  createChart(
    elementId: string,
    label: string,
    labels: string[],
    data: number[],
    borderColor: string
  ): any {
    const canvas = document.getElementById(elementId) as HTMLCanvasElement;
    return new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            borderWidth: 2,
            borderColor: borderColor,
            backgroundColor: `${borderColor}0.2)`,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
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
    window.location.href = '/relay';
  }
  openQuantity() {
    window.location.href = '/quantity';
  }
  openSprinker() {
    window.location.href = '/sprinker';
  }
  openSetTime() {
    window.location.href = '/set-time';
  }
  addgroup() {
    window.location.href = '/set-time';
  }
}
