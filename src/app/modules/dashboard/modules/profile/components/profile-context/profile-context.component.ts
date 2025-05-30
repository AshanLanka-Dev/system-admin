import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {BreakCrumbForLmsComponent} from "../../../../../../components/breakcrumb-for-lms/breakcrumb-for-lms.component";

@Component({
  selector: 'app-profile-context',
    imports: [
        RouterOutlet,
        BreakCrumbForLmsComponent
    ],
  templateUrl: './profile-context.component.html',
  standalone: true,
  styleUrl: './profile-context.component.scss'
})
export class ProfileContextComponent {

}
