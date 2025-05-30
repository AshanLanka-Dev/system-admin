import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {NewUserComponent} from '../new-user/new-user.component';
import {ViewUserLogComponent} from '../view-user-log/view-user-log.component';

@Component({
  selector: 'app-system-user-tool-bar',
  imports: [
    Dialog,
    NewUserComponent,
    ViewUserLogComponent,
  ],
  templateUrl: './system-user-tool-bar.component.html',
  styleUrl: './system-user-tool-bar.component.scss',
  standalone:true
})
export class SystemUserToolBarComponent {

  @Output() reloadTable = new EventEmitter<void>();

  @ViewChild(NewUserComponent)
  NewUserComponent!: NewUserComponent;

  visibleRoleDialog: boolean = false;
  visibleRoleLogDialog: boolean = false;

  toggleNewRoleDialog() {
    this.visibleRoleDialog =  !this.visibleRoleDialog;
  }

  onCreateRoleDialogHide(){
    if (this.NewUserComponent) {
      this.NewUserComponent.resetForm();
    }
  }

  toggleNewRoleLogDialog() {
    this.visibleRoleLogDialog = !this.visibleRoleLogDialog;
  }

  refreshList(){
    this.reloadTable.emit();
  }

  submitNewUser(){
    this.reloadTable.emit();
    this.toggleNewRoleDialog();
  }
}
