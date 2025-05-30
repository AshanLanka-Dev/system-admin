import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {NewClientComponent} from './new-client/new-client.component';

@Component({
  selector: 'app-all-clients-tool-bar',
  imports: [
    Dialog,
    NewClientComponent
  ],
  templateUrl: './all-clients-tool-bar.component.html',
  styleUrl: './all-clients-tool-bar.component.scss',
  standalone:true
})
export class AllClientsToolBarComponent {

  @Output() reloadTable = new EventEmitter<void>();

  @ViewChild(NewClientComponent)
  newRoleComponent!: NewClientComponent;

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
