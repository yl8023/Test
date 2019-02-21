import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }
  toFormGroup(options: any[]) {
    const group: any = {};
    options.forEach(option => {
      group[option.key] = new FormControl(option.value || '', Validators.required);
    });
    return new FormGroup(group);
  }
  toFormControl(text) {
    let opControl: any;
    return new FormControl(text, Validators.required);
  }
}
