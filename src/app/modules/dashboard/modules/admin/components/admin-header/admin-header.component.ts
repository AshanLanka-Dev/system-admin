import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-admin-header',
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
  standalone:true
})
export class AdminHeaderComponent {

  @Input() header:string = '';

}
