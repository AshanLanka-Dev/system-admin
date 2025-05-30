import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  standalone:true
})
export class NotFoundComponent {
  route:any = '';

  constructor(private activatedRoute: Router) {
    this.route = activatedRoute.url;
  }
}
