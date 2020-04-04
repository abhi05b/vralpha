import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  template: `
  <kendo-chart [categoryAxis]="{ categories: categories }">
            <kendo-chart-title text="Letter recognition on the scale of 1 to 10"></kendo-chart-title>
            <kendo-chart-legend position="top" orientation="horizontal"></kendo-chart-legend>
            <kendo-chart-tooltip format="{0}"></kendo-chart-tooltip>
            <kendo-chart-series>
                <kendo-chart-series-item *ngFor="let item of series"
                    type="column" [data]="item.data" [name]="item.name">
                </kendo-chart-series-item>
            </kendo-chart-series>
        </kendo-chart>
        <div>
        <md-card-subtitle>This chart is shown with demo data to showcase the idea of grading alphabets recognition in the AR game. In real scenario, initially the data for all the alphabets will be zero and built up as one plays the game.
        </md-card-subtitle>
        </div>
  `,
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  public series: any[] = [{
   name: "Rating",
   data: [10,
10,
10,
9,
8,
6,
7,
8,
9,
5,
1,
6,
6,
8,
9,
10,
4,
5,
9,
6,
7,
2,
5,
4,
8,
6]
 }];
 public categories: string[] = ['A',
'B',
'C',
'D',
'E',
'F',
'G',
'H',
'I',
'J',
'K',
'L',
'M',
'N',
'O',
'P',
'Q',
'R',
'S',
'T',
'U',
'V',
'W',
'X',
'Y',
'Z'];

}
