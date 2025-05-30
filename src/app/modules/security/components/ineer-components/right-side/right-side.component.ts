import { Component } from '@angular/core';
import {CaroselSecurityComponent} from '../carosel-security/carosel-security.component';


@Component({
  selector: 'app-right-side',
  imports: [CaroselSecurityComponent],
  templateUrl: './right-side.component.html',
  styleUrl: './right-side.component.scss',
  standalone:true
})
export class RightSideComponent {

}
