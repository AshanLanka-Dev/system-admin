import {Component, OnInit} from '@angular/core';
import {NgForOf, NgStyle} from '@angular/common';
import{TokenService} from '../../../../../../services/token.service';

interface StatCard {
  icon: string;
  title: string;
  iconBg:string;
  value: string | number;
}

@Component({
  selector: 'app-stat-cards',
  imports: [
    NgForOf,
    NgStyle
  ],
  templateUrl: './stat-cards.component.html',
  styleUrl: './stat-cards.component.scss',
  standalone:true
})
export class StatCardsComponent implements OnInit{


  constructor(private tokenService:TokenService ) {
  }

  statCards: any ;

  ngOnInit(): void {

    if( this.tokenService.isAdmin()){
      this.statCards  = [
        { icon: 'fa fa-cubes', iconBg:'#FE8F50' , title: 'BATCHES', value: 8 },
        { icon: 'fa fa-line-chart', iconBg:'#EF4444' , title: 'PROGRESS', value: '9%' },
        { icon: 'fa fa-signal', iconBg:'#18B92B' , title: 'STAGES', value: 8 },
        { icon: 'fa fa-window-maximize', iconBg:'#0C65D0' , title: 'ASSIGNMENTS', value: 11 },
      ];
    }

    else{
      this.statCards  = [
        { icon: 'fa fa-cubes', iconBg:'#FE8F50' , title: 'BATCHES', value: 8 },
        { icon: 'fa fa-line-chart', iconBg:'#EF4444' , title: 'PROGRESS', value: '9%' },
        { icon: 'fa fa-signal', iconBg:'#18B92B' , title: 'STAGES', value: 8 },
        { icon: 'fa fa-window-maximize', iconBg:'#0C65D0' , title: 'ASSIGNMENTS', value: 11 },
      ];
    }


  }
}
