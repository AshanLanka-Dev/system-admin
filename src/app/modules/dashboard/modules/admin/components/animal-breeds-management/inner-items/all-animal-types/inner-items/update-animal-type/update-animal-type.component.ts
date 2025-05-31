import { Component } from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {NewAnimalTypeComponent} from '../all-animal-type-tool-bar/new-animal-type/new-animal-type.component';

@Component({
  selector: 'app-update-animal-type',
  imports: [
    Dialog,
    NewAnimalTypeComponent
  ],
  templateUrl: './update-animal-type.component.html',
  styleUrl: './update-animal-type.component.scss',
  standalone:true
})
export class UpdateAnimalTypeComponent {

}
