import { Component,Input } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-prograss-spinner',
  imports: [ProgressSpinner],
  templateUrl: './prograss-spinner.component.html',
  styleUrl: './prograss-spinner.component.scss',
  standalone:true
})
export class PrograssSpinnerComponent {
  @Input() width:string =  '40px';
  @Input() height:string =  '40px';
}
