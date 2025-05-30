import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-view-user',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss',
  standalone:true
})
export class ViewUserComponent implements OnInit ,  OnChanges{
  @Input() selectedUser: any;

  ngOnInit(): void {
    // console.log('view user', this.selectedUser);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && changes['selectedUser'].currentValue) {
      // console.log('selected role is (onchnage)', this.selectedUser);
      // this.setValues();
    }
  }
}
