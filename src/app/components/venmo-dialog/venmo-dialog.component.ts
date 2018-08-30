import { Component, OnInit } from '@angular/core';
import { ngCopy } from 'angular-6-clipboard';
@Component({
  selector: 'app-venmo-dialog',
  templateUrl: './venmo-dialog.component.html',
  styleUrls: ['./venmo-dialog.component.scss']
})
export class VenmoDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  copy(){
    ngCopy("qishan_han")
  }
}
