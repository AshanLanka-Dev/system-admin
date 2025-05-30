import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgClass, NgForOf, NgStyle} from '@angular/common';

interface StatCard {
  bgColor: string;
  title: string;
  icon:any;
  value: string | number;
}

@Component({
  selector: 'app-admin-cards',
  imports: [
    NgForOf,
    NgStyle,
    NgClass
  ],
  templateUrl: './admin-cards.component.html',
  styleUrl: './admin-cards.component.scss',
  standalone:true
})
export class AdminCardsComponent implements OnChanges , OnInit{

  @Input() statCardData:any

  statCards: StatCard[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['statCardData'] && changes['statCardData'].currentValue) {

    }
  }

  formatPrice(value: number, currency: string = ''): string {

    if (isNaN(value)) return '';

    let formatted: string;

    if (value >= 1_000_000_000) {
      formatted = (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (value >= 1_000_000) {
      formatted = (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 1_000) {
      formatted = (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
      formatted = value.toFixed(2).replace(/\.00$/, '');
    }

    return currency + formatted;
  }

  ngOnInit(): void {

    this.statCards = [
      { bgColor: '#0C65D0', icon:'fas fa-users-cog' , title: 'All USERS', value:  5 },
      { bgColor: '#EF4444', icon:'fa fa-users', title: 'All CLIENTS', value:  100 },
      { bgColor: '#18B92B', icon:'fa fa-github', title: 'All PETS', value:  150 },
      { bgColor: '#636e72', icon:'fa fa-line-chart', title: 'TOTAL REVENUE (LKR)', value: this.formatPrice(500000) },
    ];
  }


}
