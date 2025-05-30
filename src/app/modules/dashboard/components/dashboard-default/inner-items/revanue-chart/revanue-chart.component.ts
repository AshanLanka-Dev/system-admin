import {ChangeDetectorRef, Component, inject, OnChanges, OnInit, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {DashboardService} from '../../../../../../services/dashboard/dashboard.service';
import {isPlatformBrowser} from '@angular/common';
import {ChartModule} from 'primeng/chart';
import {FormsModule} from '@angular/forms';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'app-revanue-chart',
  imports: [ChartModule, FormsModule, DatePicker],
  templateUrl: './revanue-chart.component.html',
  styleUrl: './revanue-chart.component.scss',
  standalone: true
})
export class RevanueChartComponent implements OnInit {

  date: Date[] | undefined;
  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);
  monthlyRevenue:any;
  revenueDataWith12months:any;
  yearRevenue = '';

  constructor(
    private dashboardService: DashboardService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.getMonthlyRevenue();
    this.getYearlyRevenue();

    this.initChart();
  }

  // Handle date selection change
  onYearChange(event: any) {
    console.log('selected year (onYearChange)', this.date);
    this.getMonthlyRevenue();
    this.getYearlyRevenue();
  }

  getMonthlyRevenue() {
    // this.dashboardService.getMonthlyRevenue(this.returnYear(this.date))
    //   .subscribe({
    //     next: (response) => {
    //       // console.log('revenue', response);
    //       this.monthlyRevenue = response.data;
    //
    //      this.revenueDataWith12months = this. getFormattedRevenueData(this.monthlyRevenue);
    //      this.initChart();
    //
    //     },
    //     error: (error) => {
    //       console.error('error', error);
    //       // this.messageService.add({ severity: 'warn', summary: 'Warn', detail: error?.error?.message });
    //     }
    //   });
  }

  getYearlyRevenue(){
    // console.log('yearly')
    //   this.dashboardService.getYearlyRevenue(this.returnYear(this.date))
    //     .subscribe({
    //       next: (response) => {
    //         // console.log('yearly revenue', response);
    //         this.yearRevenue = response?.data[0]?.totalRevenue;
    //
    //         this.revenueDataWith12months = this. getFormattedRevenueData(this.monthlyRevenue);
    //         this.initChart();
    //
    //       },
    //       error: (error) => {
    //         console.error('error', error);
    //         // this.messageService.add({ severity: 'warn', summary: 'Warn', detail: error?.error?.message });
    //       }
    //     });
  }


  // getYearlyRevenue(){
  //   this.dashboardService.getYearlyRevenue() .getMonthlyRevenue(this.returnYear(this.date))
  //     .subscribe({
  //       next: (response) => {
  //         console.log('revenue', response);
  //         this.monthlyRevenue = response.data;
  //
  //         this.revenueDataWith12months = this. getFormattedRevenueData(this.monthlyRevenue);
  //         this.initChart();
  //
  //       },
  //       error: (error) => {
  //         console.error('error', error);
  //         // this.messageService.add({ severity: 'warn', summary: 'Warn', detail: error?.error?.message });
  //       }
  //     });
  // }

  returnYear(date: Date | Date[] | undefined): string {
    if (date) {
      return this.extractYear(date); // Fixed: was this.date, now using the param
    } else {
      return this.extractYear(new Date())
    }
  }

  extractYear(date: Date | Date[] | undefined): string {
    if (!date) {
      return new Date().getFullYear().toString(); // Default to current year
    }

    // If it's an array, use the first date
    if (Array.isArray(date)) {
      if (date.length === 0) {
        return new Date().getFullYear().toString(); // Default to current year for empty array
      }
      return date[0].getFullYear().toString();
    }

    // If it's a single Date object
    return date.getFullYear().toString();
  }

  getFormattedRevenueData(monthlyRevenue: any[]): { year: string, month: string, revenue: string }[] {
    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    // Use the year from the first record or current year as fallback
    const year = (monthlyRevenue?.[0]?.year || new Date().getFullYear()).toString();

    const fullYearRevenue = monthNames.map((name, index) => {
      const monthData = monthlyRevenue.find(item => item.month === index + 1);
      return {
        year: year,
        month: name,
        revenue: monthData ? monthData.totalRevenue.toString() : '0'
      };
    });

    return fullYearRevenue;
  }



  initChart() {
      // if (isPlatformBrowser(this.platformId) && this.revenueDataWith12months && this.revenueDataWith12months.length) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

        // const labels = this.revenueDataWith12months.map((item: any) => item.month);
        // const revenue = this.revenueDataWith12months.map((item: any) => item.revenue);
        // const revenue = this.revenueDataWith12months.map((item: any) => 222,222,100,500,600,100,100,100,100,100);

    const labels =  ['January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December']

    const revenue = [
      110000,150000,116000,100000,170000,10000,0,0,0,0,0
    ]

        this.data = {
          labels,
          datasets: [
            {
              type: 'line',
              label: 'Revenue Trend',
              borderColor: documentStyle.getPropertyValue('--chart-revenue-trend-line-color'),
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              data: revenue
            },
            {
              type: 'bar',
              label: 'Revenue',
              backgroundColor: documentStyle.getPropertyValue('--chart-revenue-bar-color'),
              data: revenue
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
      // }
    }

  }

