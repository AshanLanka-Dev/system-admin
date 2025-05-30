import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  PLATFORM_ID,
  ChangeDetectorRef,
  inject,
  effect,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-result-chart',
  imports: [ChartModule],
  templateUrl: './result-chart.component.html',
  styleUrl: './result-chart.component.scss',
  standalone:true
})
export class ResultChartComponent implements OnInit , OnChanges{
  @Input() assignmentMarks:any

  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['assignmentMarks'] && changes['assignmentMarks'].currentValue) {
      console.log('selected coursedata is (onchnage)', this.assignmentMarks);
      // // Dummy data for testing
      this.assignmentMarks = [
      {
        assigmentType: 'READING',
          marks: {
        averageMarks: 78,
          maxMarks: 90,
          minMarks: 65
      }
      },
      {
        assigmentType: 'GRAMMAR',
          marks: {
        averageMarks: 82,
          maxMarks: 95,
          minMarks: 70
      }
      },
      {
        assigmentType: 'VOCABULARY',
          marks: {
        averageMarks: 35,
          maxMarks: 88,
          minMarks: 32
      }
      },
      {
        assigmentType: 'LISTENING',
          marks: {
        averageMarks: 80,
          maxMarks: 92,
          minMarks: 68
      }
      },
      {
        assigmentType: 'KANJI',
          marks: {
        averageMarks: 85,
          maxMarks: 98,
          minMarks: 72
      }
      }
      ];
      this.initChart();
    }
  }

  initChart() {
    if (isPlatformBrowser(this.platformId) && this.assignmentMarks && this.assignmentMarks.length) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      const labels = this.assignmentMarks.map((item: any) => item.assigmentType);
      const minMarks = this.assignmentMarks.map((item: any) => item.marks.minMarks);
      const maxMarks = this.assignmentMarks.map((item: any) => item.marks.maxMarks);
      const averageMarks = this.assignmentMarks.map((item: any) => item.marks.averageMarks);

      this.data = {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'Assignment Trend',
            borderColor: documentStyle.getPropertyValue('--primary-color'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: averageMarks
          },
          {
            type: 'bar',
            label: 'Assignment Min Marks',
            backgroundColor: documentStyle.getPropertyValue('--chart-min-bar-color'),
            data: minMarks
          },
          {
            type: 'bar',
            label: 'Assignment Average Marks',
            backgroundColor: documentStyle.getPropertyValue('--chart-av-bar-color'),
            data: averageMarks
          }
          ,
          {
            type: 'bar',
            label:'Assignment Max Marks',
            backgroundColor: documentStyle.getPropertyValue('--chart-max-bar-color'),
            data: maxMarks
          }
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      };

      this.cd.markForCheck();
    }
  }


}
