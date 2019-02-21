import { OptionModel } from './option.model';
import { FormGroup } from '@angular/forms';

export class QFormModel {
  form: FormGroup;
  name: string;
  type: number;
  options: OptionModel[] = [];
}
