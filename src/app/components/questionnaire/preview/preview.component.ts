import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  QuestionnaireList: any[];
  Questionnaire: any;
  qId: number;
  answerList: any[] = [];
  constructor(private storage: StorageService, private route: ActivatedRoute, private router: Router, private http: HttpService) {
    this.http.backFn();
  }

  ngOnInit() {
    this.QuestionnaireList = this.storage.getStorage('QuestionnaireList');
    this.route.params.subscribe((par) => {
      this.qId = par.id;
      this.Questionnaire = this.QuestionnaireList[par.id];
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
  editFn() {
    this.router.navigateByUrl('/questionnaire/add/' + this.qId);
  }
  goBack() {
    this.router.navigate(['questionnaire']);
  }
}
