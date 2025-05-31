import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {NewBreedComponent} from './inner-items/new-breed/new-breed.component';
import {
  NewAnimalTypeComponent
} from '../../../all-animal-types/inner-items/all-animal-type-tool-bar/new-animal-type/new-animal-type.component';

@Component({
  selector: 'app-all-breeds-tool-bar',
  imports: [
    Dialog,
    NewBreedComponent,
    NewAnimalTypeComponent
  ],
  templateUrl: './all-breeds-tool-bar.component.html',
  styleUrl: './all-breeds-tool-bar.component.scss',
  standalone:true
})
export class AllBreedsToolBarComponent {

  @Output() reloadTable = new EventEmitter<void>();

  @ViewChild(NewBreedComponent)
  newRoleComponent!: NewBreedComponent;

  visibleNewClientDialog: boolean = false;

  toggleNewClientDialog() {
    this.visibleNewClientDialog =  !this.visibleNewClientDialog;
  }

  onCreateClientDialogHide(){
    if (this.newRoleComponent) {
      // this.newRoleComponent.resetForm();
    }
  }

  refreshList(){
    this.reloadTable.emit();
  }

  submitNewRole(){
    this.reloadTable.emit();
    this.toggleNewClientDialog();
  }
}
