import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  echartsData: any = [];
  QuestionnaireList: any;
  Questionnaire: any;
  select = 0;
  HeaderOp: any = ['A', 'B', 'C', 'D', 'E', 'F'];
  constructor(private storage: StorageService) { }
  selectFn() {
    this.echartsData = [];
    this.Questionnaire = this.QuestionnaireList[this.select];
    this.echartDataFn(this.Questionnaire);
    // console.log(this.Questionnaire, this.select);
  }
  echartDataFn(q) {// 传入当前选中的问卷，每一题为一个图表组。
    const List = [];
    q.questions.forEach( (question, key) => {
      const xData = this.HeaderOp.slice(0, question.options.length);
      const questionName = key + 1 + '丶' + question.text + '(' + (question.type === '0' ? '单选' : question.type === '1' ? '多选' : '填空') + ')';
      const ansList = [];
      xData.forEach( () => {
        ansList.push(0);
      });
      q.answer.forEach((as) => {
        switch (question.type) {
          case '0': {
            xData.forEach( (val, opKey) => {
              if (val === as[key]) {
                ansList[opKey]++;
              }
            });
          } break;
          case '1': {
            as[key].forEach( (asval, askey) => {
              if (asval) {
                ansList[askey]++;
              }
            });
          } break;
          case '2': {
            ansList.push(as[key]);
          } break;
        }
      });
        List.push({
          x: xData,
          type: question.type,
          name: questionName,
          ans: ansList
        });
    });
    console.log(List);
    this.echartFn(List);
  }
  echartFn(list) {
    list.forEach((value) => {
      const pieData = [];
      const textData = [];
      value.x.forEach((xval, xkey) => {
        textData.push(xval + '选项被选中了' + value.ans[xkey] + '次');
      })
      value.ans.forEach((val, key) => {
        pieData.push({
          name: this.HeaderOp[key],
          value: val
        });
      });
      const echart = {
        title: {
          text: value.name
        },
        tooltip : {
          trigger: 'item'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '10%',
          right: '45%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            boundaryGap : true,
            data : value.x
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name: '答卷数',
            type: 'bar',
            data: value.ans,
            animationDelay: function (idx) {
              return idx * 200;
            }
          },
          {
            name: '答卷数',
            type: 'pie',
            radius : '35%',
            center: ['75%', '65%'],
            data: pieData,
            animationDelay: function (idx) {
              return idx * 80 + 500;
            },
            tooltip: {
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            }
          }
        ],
        graphic: [
          {
            type: 'group',
            right: '10%',
            top: '10%',
            children: [
              {
                type: 'rect',
                z: 100,
                left: 'center',
                top: 'middle',
                shape: {
                  width: 190,
                  height: 90
                },
                style: {
                  fill: '#fff',
                  stroke: '#555',
                  lineWidth: 2,
                  shadowBlur: 8,
                  shadowOffsetX: 3,
                  shadowOffsetY: 3,
                  shadowColor: 'rgba(0,0,0,0.3)'
                }
              },
              {
                type: 'text',
                z: 100,
                left: 'center',
                top: 'middle',
                style: {
                  fill: '#333',
                  text: textData.join('\n'),
                  font: '14px Microsoft YaHei'
                }
              }
            ]
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx * 5;
        }
      };
      if (value.type < 2) {
        this.echartsData.push(echart);
      } else {
        this.echartsData.push(value);
      }
    });
  }
  ngOnInit() {
    this.QuestionnaireList = this.storage.getStorage('QuestionnaireList') || [];
    if (this.QuestionnaireList.length > 0) {
      this.selectFn();
    }
  }
}
