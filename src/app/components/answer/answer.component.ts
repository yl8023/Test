import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { HttpService } from '../../services/http.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  confirm = false;
  QuestionnaireList: any[];
  Questionnaire: any;
  qId: number;
  answerList: any[] = [];
  constructor(private storage: StorageService, private route: ActivatedRoute, private router: Router, private http: HttpService,
              private title: Title) {
    this.http.backFn();
  }

  ngOnInit() {
    this.QuestionnaireList = this.storage.getStorage('QuestionnaireList')
    this.route.params.subscribe((par) => {
      this.qId = par.id;
      this.Questionnaire = this.QuestionnaireList[par.id];
      this.title.setTitle(this.Questionnaire.name);
      this.Questionnaire.questions.forEach((val) => {
        if (val.type === '1') {
          let list: any = [];
          val.options.forEach(() => {
            list.push(false);
          });
          this.answerList.push(list);
        } else {
          this.answerList.push('');
        }
      });
    });
  }
  submitForm() {
    let confirm = true;
    // this.answerList.forEach((value) => {
    //   value.toString();
    //   value.forEach( (val) => {
    //     console.log(val, val === '');
    //     if (val === '') {
    //       confirm = false;
    //     }
    //   });
    // });
    if (confirm) {
      this.Questionnaire.answer.push(this.answerList);
      this.QuestionnaireList.forEach((val, key) => {
        if (val.id === this.Questionnaire.id) {
          this.QuestionnaireList.splice(key, 1, this.Questionnaire);
        }
      })
      this.storage.setStorage('QuestionnaireList', this.QuestionnaireList);
      this.confirm = true;
      this.http.messageCreat('success', '提交成功！');
    } else {
      this.http.messageCreat('error', '清检查是否填写完成哦');
    }
  }
}
