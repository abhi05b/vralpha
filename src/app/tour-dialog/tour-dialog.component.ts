import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-tour-dialog',
  templateUrl: './tour-dialog.component.html',
  styleUrls: ['./tour-dialog.component.scss']
})
export class TourDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<TourDialogComponent>) { }

  ngOnInit() {
  }

}
