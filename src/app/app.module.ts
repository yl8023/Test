import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgxEchartsModule } from 'ngx-echarts';

import { HomeComponent } from './components/home/home.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { DotadataComponent } from './components/dotadata/dotadata.component';
import { ViewComponent } from './components/view/view.component';
import { AllComponent } from './components/questionnaire/all/all.component';
import { ChartComponent } from './components/questionnaire/chart/chart.component';
import { AddComponent } from './components/questionnaire/add/add.component';
import { PreviewComponent } from './components/questionnaire/preview/preview.component';
import { AnswerComponent } from './components/answer/answer.component';

import { HttpService } from './services/http.service';
import { FieldsService } from './services/fields.service';
import { StorageService } from './services/storage.service';
import { QuestionService } from './services/question.service';




registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionnaireComponent,
    DotadataComponent,
    ViewComponent,
    AllComponent,
    ChartComponent,
    AddComponent,
    PreviewComponent,
    AnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxEchartsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    HttpService,
    FieldsService,
    StorageService,
    QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
