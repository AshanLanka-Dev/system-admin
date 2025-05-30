import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {NewPetComponent} from './inner-items/new-pet/new-pet.component';

@Component({
  selector: 'app-pets-tool-bar',
  imports: [
    Dialog,
    NewPetComponent
  ],
  templateUrl: './pets-tool-bar.component.html',
  styleUrl: './pets-tool-bar.component.scss',
  standalone:true
})
export class PetsToolBarComponent {

  @Output() reloadTable = new EventEmitter<void>();

  @ViewChild(NewPetComponent)
  newRoleComponent!: NewPetComponent;

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

