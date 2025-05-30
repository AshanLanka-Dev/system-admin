import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, RouterOutlet, Toast],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin-web';
}
