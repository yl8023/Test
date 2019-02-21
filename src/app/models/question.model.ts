import { OptionModel } from './option.model';

export class QuestionModel {
  name: string;
  type: number;
  text: string;
  options: OptionModel[];
}
