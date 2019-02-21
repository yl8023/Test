import { QuestionModel } from './question.model';

export class QuestionnaireModel {
  id: number;
  name: string;
  questions: QuestionModel[] = [];
  date: string;
  check: boolean;
  answer: any[];
}
