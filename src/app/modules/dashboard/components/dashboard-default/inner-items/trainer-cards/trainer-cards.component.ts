import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgForOf} from '@angular/common';

interface StatCard {
  icon: string;
  title: string;
  value: string | number;
}

@Component({
  selector: 'app-trainer-cards',
  imports: [
    NgForOf
  ],
  templateUrl: './trainer-cards.component.html',
  styleUrl: './trainer-cards.component.scss',
  standalone:true
})
export class TrainerCardsComponent implements OnChanges{

  @Input() statCardData:any

  statCards: StatCard[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['statCardData'] && changes['statCardData'].currentValue) {
      console.log('stat card data is (onchnage)', this.statCardData);

      this.statCards = [
        { icon: '/images/dashboard/card-items/1-i.png', title: 'COURSES', value: this.statCardData?.assignCoursesCount ?? 0 },
        { icon: '/images/dashboard/card-items/2-i.png', title: 'PROGRESS', value: `${this.statCardData?.progress ?? 0}%` },
        { icon: '/images/dashboard/card-items/3-i.png', title: 'STAGES', value: this.statCardData?.stageCount ?? 0 },
        { icon: '/images/dashboard/card-items/4-i.png', title: 'ASSIGNMENTS', value: this.statCardData?.assigmentCount ?? 0 },
      ];
    }
  }



}
