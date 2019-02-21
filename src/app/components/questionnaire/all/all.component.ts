import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../../../services/storage.service';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  answerHttp: any;
  delState = false;
  buttonType = 'danger';
  buttonText = '批量删除';
  QuestionnaireList: any[];
  delList: any[] = [];
  constructor(private storage: StorageService, private router: Router, private http: HttpService) {
    this.http.questclickFn();
  }

  ngOnInit() {
    this.QuestionnaireList = this.storage.getStorage('QuestionnaireList') || [];
  }
  delChange() {
    this.delState = !this.delState;
    this.buttonType = this.delState ? 'primary' : 'danger';
    this.buttonText = this.delState ? '确定' : '批量删除';
    if (!this.delState) {
      let QuestionnaireList = this.QuestionnaireList;
      QuestionnaireList.forEach((questionnaire) => {
        if (questionnaire.check) {
          this.delList.push(questionnaire.id);
        }
      });
      // for循环
      for (let i = 0; i < this.QuestionnaireList.length; i++) {
        for (let j = 0; j < this.delList.length; j++) {
          if (this.QuestionnaireList[i].id === this.delList[j]) {
            this.QuestionnaireList.splice(i, 1);
          }
        }
      }
      this.storage.setStorage('QuestionnaireList', this.QuestionnaireList);
      // forEach循环
      // this.QuestionnaireList.forEach((questionnaire) => {
      //   this.delList.forEach((qdel) => {
      //     if (questionnaire.id === qdel) {
      //       console.log(questionnaire.id === qdel);
      //       this.QuestionnaireList.splice(this.QuestionnaireList.indexOf(questionnaire), 1);
      //     }
      //   });
      // });
    }
  }
  goPreview(key) {
    console.log(key);
    // this.router.navigate(['questionnaire/preview']);
    this.router.navigateByUrl('/questionnaire/preview/' + key);
  }
  addQuestion() {
    this.router.navigate(['questionnaire/add']);
  }
  goAnswer(key) {
    this.answerHttp =  window.location.href.replace('questionnaire/all', 'answer/' + key);
  }
}
