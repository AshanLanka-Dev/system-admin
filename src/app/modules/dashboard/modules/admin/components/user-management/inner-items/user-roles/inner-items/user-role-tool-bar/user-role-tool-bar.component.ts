import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {NewRoleComponent} from '../new-role/new-role.component';
import {ViewRoleLogComponent} from '../view-role-log/view-role-log.component';

@Component({
  selector: 'app-user-role-tool-bar',
  imports: [
    Dialog,
    NewRoleComponent,
    ViewRoleLogComponent
  ],
  templateUrl: './user-role-tool-bar.component.html',
  styleUrl: './user-role-tool-bar.component.scss',
  standalone:true
})
export class UserRoleToolBarComponent {

  @Output() reloadTable = new EventEmitter<void>();

  @ViewChild(NewRoleComponent)
  newRoleComponent!: NewRoleComponent;

  visibleRoleDialog: boolean = false;
  visibleRoleLogDialog: boolean = false;

  toggleNewRoleDialog() {
    this.visibleRoleDialog =  !this.visibleRoleDialog;
  }

  onCreateRoleDialogHide(){
    if (this.newRoleComponent) {
      this.newRoleComponent.resetForm();
    }
  }

  toggleNewRoleLogDialog() {
    this.visibleRoleLogDialog = !this.visibleRoleLogDialog;
  }

  refreshList(){
    this.reloadTable.emit();
  }

  submitNewRole(){
    this.reloadTable.emit();
    this.toggleNewRoleDialog();
  }
}
