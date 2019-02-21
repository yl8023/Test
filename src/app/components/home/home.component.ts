import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FieldsService } from '../../services/fields.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search: any = '';
  constructor(private httpSer: HttpService, private httpf: FieldsService) {
    this.httpSer.homeclickFn();
  }

  ngOnInit() {
  }
  searchData() {
    this.httpSer.httpget(this.httpf.joint('search'), { q: this.search });
  }
  proPlayerData() {
    this.httpSer.httpget(this.httpf.joint('proPlayers'));
  }
  getheight() {
    console.log( document.documentElement.clientHeight );
  }
}
