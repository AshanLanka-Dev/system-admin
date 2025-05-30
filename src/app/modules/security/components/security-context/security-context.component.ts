import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-security-context',
  imports: [
    RouterOutlet,
    Toast
  ],
  templateUrl: './security-context.component.html',
  styleUrl: './security-context.component.scss',
  standalone:true
})
export class SecurityContextComponent {

}
