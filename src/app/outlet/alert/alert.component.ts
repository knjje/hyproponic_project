import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  show = false;

  data: any = {
    title: '',
    textBody: '',
    status: '',
    textButton: '',
    confirmButton: false,
    cancleButton: false,
    cancleButtonText: 'ยกเลิก',
  };

  imgStatus = '';
  textStatus = '';
  headClass = '';
  btnClass = '';

  constructor(public dialogRef: MatDialogRef<AlertComponent>) {
    dialogRef.disableClose = true;
  }
  ngOnInit(): void {}
  
  submit(): void {
    this.dialogRef.close({
      isResult: true,
    });
  }

  cancel(): void {
    this.dialogRef.close({
      isResult: false,
    });
  }


}
