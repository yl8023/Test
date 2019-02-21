import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  configSet: any =  {
    silder: true,
    menu: true,
    list: [],
    headerStu: true
  };
  constructor(private http: HttpClient, private message: NzMessageService, private modal: NzModalService) { }
  httpget(url, params?: any) {
    if (params) {
      console.log(params);
      let str: any = '?';
      for (const key in params) {
        str += key.toString() + '=' + params[key].toString();
      }
      console.log(str);
      url += str;
    }
    this.http.get(url).subscribe((res) => {
      console.log(123);
      return res;
    });
  }
  getDate() {
    let Dateol = new Date();
    let date = Dateol.toLocaleDateString();
    return date;
  }
  messageCreat(type: string, message: string) {
    this.message.create(type, message);
  }
  showConfirm(title, content, fn: any): void {
    this.modal.confirm({
      nzTitle  : title,
      nzContent: content,
      nzOnOk   : () => fn
    });
  }
  homeclickFn() {
    this.configSet.headerStu = true;
    this.configSet.silder = true;
    this.configSet.menu = true;
    this.configSet.list = [];
  }
  dotaclickFn() {
    this.configSet.headerStu = true;
    this.configSet.silder = false;
    this.configSet.menu = false;
    this.configSet.list = [];
  }
  questclickFn() {
    this.configSet.headerStu = true;
    this.configSet.silder = false;
    this.configSet.menu = false;
    this.configSet.list = [
      {text: '全部问卷', icon: 'hdd', router: 'questionnaire/all'},
      {text: '统计图表', icon: 'bar-chart', router: 'questionnaire/chart'}
    ];
  }
  backFn() {
    this.configSet.headerStu = false;
    this.configSet.silder = true;
    this.configSet.menu = true;
    this.configSet.list = [];
  }
}
