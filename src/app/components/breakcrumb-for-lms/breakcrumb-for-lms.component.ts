import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-breakcrumb-for-lms',
  imports: [
    NgForOf,
    RouterLink,
    // NgIf
  ],
  templateUrl: './breakcrumb-for-lms.component.html',
  standalone: true,
  styleUrl: './breakcrumb-for-lms.component.scss'
})
export class BreakCrumbForLmsComponent implements OnInit{
  @Input() lastItem: string = '';
  @Input() isCancelButtonVisible: boolean = false;
  @Input() addOtherItems!:{label:string,link:string}[];

  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  breadcrumbItems = [
    { label: 'Dashboard', link: '/dashboard/process/home' }
  ];

  ngOnInit(): void {
    if (this.addOtherItems?.length) {
      this.breadcrumbItems.push(...this.addOtherItems);
    }
  }
}
