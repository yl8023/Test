import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  viewHeight: any;
  // viewWidth: any;
  constructor() { }

  ngOnInit() {
    this.viewHeight = document.documentElement.clientHeight - 64 - 50 + 'px';
    // this.viewWidth = document.documentElement.clientWidth - 200 + 'px';
  }

}
