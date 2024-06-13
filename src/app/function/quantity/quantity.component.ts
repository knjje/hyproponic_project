import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css'],
})
export class QuantityComponent implements OnInit {
  Fer: any = 0;
  Mb: any = 0;
  phUp: any = 0;
  phD: any = 0;
  constructor(private auth: AuthService, private db: AngularFireDatabase) {}
  ngOnInit(): void {
    this.getdata();
  }

  getdata(){
    let qfer = this.db
      .object('quantityFT')
      .valueChanges();
      qfer.subscribe((state: any) => {
      this.Fer = state;
    });


    let qmb = this.db
    .object('quantityMB')
    .valueChanges();
    qmb.subscribe((state: any) => {
    this.Mb = state;
  });


  let qup = this.db
  .object('quantityphup')
  .valueChanges();
  qup.subscribe((state: any) => {
  this.phUp = state;
});


let qd = this.db
.object('quantityphdown')
.valueChanges();
qd.subscribe((state: any) => {
this.phD = state;
});

  }

  reset() {
    this.Fer = 0;
    this.Mb = 0;
    this.phUp = 0;
    this.phD = 0;
  }

  async submit() {
    this.auth.Swal('กำลังเติมสารเข้าถังน้ำ', 'success');
    this.db
      .object('quantityFT')
      .set(this.Fer)
      .then(() => console.log('Finish updating value'))
      .catch((error) =>
        console.error('Error updating value in Firebase:', error)
      );

    this.db
      .object('quantityMB')
      .set(this.Mb)
      .then(() => console.log('Finish updating value'))
      .catch((error) =>
        console.error('Error updating value in Firebase:', error)
      );

    this.db
      .object('quantityphup')
      .set(this.phUp)
      .then(() => console.log('Finish updating value'))
      .catch((error) =>
        console.error('Error updating value in Firebase:', error)
      );

    this.db
      .object('quantityphdown')
      .set(this.phD)
      .then(() => console.log('Finish updating value'))
      .catch((error) =>
        console.error('Error updating value in Firebase:', error)
      );
  }

  FT(value: any) {
    if (value === 250) {
      this.Fer = 13;
    } else if (value === 500) {
      this.Fer = 26;
    }
    else {
      this.Fer = 0;
    }
    console.log(this.Fer);
  }

  MB(value: any) {
    if (value === 250) {
      this.Mb = 13;
    } else if (value === 500) {
      this.Mb = 26;
    }
    else {
      this.Mb = 0;
    }
    console.log(this.Mb);
  }

  PhUp(value: any) {
    if (value === 250) {
      this.phUp = 13;
    } else if (value === 500) {
      this.phUp = 26;
    }
    else {
      this.phUp = 0;
    }
    console.log(this.phUp);
  }

  PhD(value: any) {
    if (value === 250) {
      this.phD = 13;
    } else if (value === 500) {
      this.phD = 26;
    }
    else {
      this.phD = 0;
    }
    console.log(this.phD);
  }
}
