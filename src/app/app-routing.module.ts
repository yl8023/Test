import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
  import { AllComponent } from './components/questionnaire/all/all.component';
  import { ChartComponent } from './components/questionnaire/chart/chart.component';
  import { AddComponent } from './components/questionnaire/add/add.component';
  import { PreviewComponent } from './components/questionnaire/preview/preview.component';
import { DotadataComponent } from './components/dotadata/dotadata.component';
import { AnswerComponent } from './components/answer/answer.component';


// @ts-ignore
const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'questionnaire', component: QuestionnaireComponent, children:
      [
        {path: 'all', component: AllComponent},
        {path: 'add', component: AddComponent},
        {path: 'add/:id', component: AddComponent},
        {path: 'chart', component: ChartComponent},
        {path: 'preview/:id', component: PreviewComponent},
        {path: '**', redirectTo: 'all'}
      ]
  },
  {
    path: 'answer/:id', component: AnswerComponent
  },
  {
    path: 'dotadata', component: DotadataComponent
  },
  {
    path: '**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
