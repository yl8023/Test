import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { QuestionService } from '../../../services/question.service';
import { StorageService } from '../../../services/storage.service';
import { HttpService } from '../../../services/http.service';

import { QFormModel } from '../../../models/q-Form.model';
import { OptionModel } from '../../../models/option.model';
import { QuestionnaireModel } from '../../../models/questionnaire.model';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  formList: QFormModel[] = [];
  opHeader: any[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  qId: number;
  Qname: any;
  QuestionnaireList: any[];
  Questionnaire = new QuestionnaireModel();
  constructor(private fb: FormBuilder, private questionSer: QuestionService, private route: ActivatedRoute,
              private storage: StorageService, private router: Router, private http: HttpService) {
    this.http.backFn();
  }
  ngOnInit(): void {
    this.QuestionnaireList = this.storage.getStorage('QuestionnaireList') || [];
    this.route.params.subscribe((par) => {
      if (par.id || par.id === 0) {
        this.qId = par.id;
        this.Questionnaire = this.QuestionnaireList[par.id];
        this.Questionnaire.questions.forEach((quest, key) => {
          this.addQuestion(quest.text);
          this.formList[key].form.get('type').setValue(quest.type);
          quest.options.forEach((opt) => {
            this.addOption(this.formList[key], opt.text);
          });
        });
        this.Qname = new FormControl(this.Questionnaire.name, [Validators.required]);
      } else {
        this.addQuestion('');
        this.Qname = new FormControl('', [Validators.required], [this.questionValidator]);
      }
    });
  }
  questionValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    if (this.QuestionnaireList.length > 0) {
      setTimeout(() => {
        makeing(this.QuestionnaireList, 0);
      }, 1000);
    } else {
      observer.next(null);
      observer.complete();
    }
    function makeing (arr, idx) {
        if (control.value === arr[idx].name) {
          observer.next({ error: true, duplicated: true });
          observer.complete();
        } else {
          observer.next(null);
        }
        if (idx === arr.length - 1) {
          observer.complete();
        } else {
          makeing(arr, ++idx);
        }
    }
  })
  goBack() {
    this.router.navigate(['questionnaire']);
  }
  Ctype(val) {
    let typeControl = new FormControl(val);
    return typeControl;
  }
  addQuestion(text) {
    let QuestionForm = new QFormModel();
    QuestionForm.form = new FormGroup({quest: this.questionSer.toFormControl(text)});
    QuestionForm.name = 'quest';
    if (!this.qId && this.qId !== 0) {
      QuestionForm.type = 0;
      QuestionForm.form.addControl(QuestionForm.name, this.questionSer.toFormControl(text));
      QuestionForm.form.addControl('type', this.Ctype( QuestionForm.type));
      QuestionForm.form.get('type').setValue(QuestionForm.type + '');
    } else {
      QuestionForm.form.addControl('type', this.Ctype( QuestionForm.type));
      QuestionForm.form.get('type').setValue('0');
    }
    this.formList.push(QuestionForm);
  }
  formReset(form) {
    form.reset();
  }
  formDelete(qForm) {
    this.formList.splice(this.formList.indexOf(qForm), 1);
  }
  addOption(qf: any, text) {
    let Option = new OptionModel();
    Option.name = this.opHeader[qf.options.length];
    qf.options.push(Option);
    qf.form.addControl(Option.name, this.questionSer.toFormControl(text));
  }
  delOption(qf, option) {
    qf.options.splice(qf.options.indexOf(option), 1);
    qf.form.removeControl(option.name);
    for (let i = 0; i < qf.options.length; i++) {
      qf.options[i].name = this.opHeader[i];
    }
  }
  submitForm(): void {
    let Stau = true;
    this.Qname.markAsDirty();
    this.Qname.updateValueAndValidity();
    // console.log(this.Qname);
    if (!this.Qname.error) {
      Stau = true;
    } else {
      Stau = false;
    }
    // console.log(Stau, this.Qname.valid);
    this.formList.forEach((value) => {
      const formGro = value.form;
      if (value.form.get('type').value === 2) {
        value.options.forEach((opt) => {
          formGro.removeControl(opt.name);
        });
      }
      for (const i in formGro.controls) {
        formGro.controls[i].markAsDirty();
        formGro.controls[i].updateValueAndValidity();
      }
      if (!formGro.valid) {
        Stau = false;
      }
    });
    if (Stau) {
      console.log ('ok');
      this.saveData();
    } else {
      console.log('no');
    }
  }
  saveData() {
    this.Questionnaire.id = (new Date()).valueOf();
    this.Questionnaire.name = this.Qname.value;
    this.Questionnaire.answer = [];
    this.Questionnaire.date = this.http.getDate();
    this.Questionnaire.check = false;
    if (this.qId || this.qId === 0) {
      this.QuestionnaireList.splice(this.qId, 1);
      this.Questionnaire.questions = [];
    }
    this.formList.forEach((value, key) => {
      let question: any = {
        name: '',
        text: '',
        type: 0,
        options: []
      };
      question.name = value.name;
      question.text = value.form.get(value.name).value;
      question.type = value.form.get('type').value;
      if (value.form.get('type').value !== 2) {
        question.options = value.options;
      }
      question.options.forEach((opt) => {
        opt.text = value.form.get(opt.name).value;
      });
      this.Questionnaire.questions.push(question);
    });
    console.log(this.Questionnaire);
    this.QuestionnaireList.splice(this.qId, 0, this.Questionnaire);
    this.storage.setStorage('QuestionnaireList', this.QuestionnaireList);
    this.http.messageCreat('success', '问卷添加成功。');
    this.router.navigate(['questionnaire/all']);
  }
}
