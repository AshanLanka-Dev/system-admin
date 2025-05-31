import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {NewAnimalTypeComponent} from './new-animal-type/new-animal-type.component';

@Component({
  selector: 'app-all-animal-type-tool-bar',
  imports: [
    Dialog,
    NewAnimalTypeComponent
  ],
  templateUrl: './all-animal-type-tool-bar.component.html',
  styleUrl: './all-animal-type-tool-bar.component.scss',
  standalone:true
})
export class AllAnimalTypeToolBarComponent {

  @Output() reloadTable = new EventEmitter<void>();

  @ViewChild(NewAnimalTypeComponent)
  newRoleComponent!: NewAnimalTypeComponent;

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
