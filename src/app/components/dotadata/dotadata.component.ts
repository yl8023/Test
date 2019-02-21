import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-dotadata',
  templateUrl: './dotadata.component.html',
  styleUrls: ['./dotadata.component.scss']
})
export class DotadataComponent implements OnInit {
  echartsData: any;
  constructor(private http: HttpService) {
    this.http.dotaclickFn();
  }

  ngOnInit() {
  }

}
