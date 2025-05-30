import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {NewUserComponent} from '../../../system-users/inner-items/new-user/new-user.component';
import {ViewUserLogComponent} from '../../../system-users/inner-items/view-user-log/view-user-log.component';
import {NewRecetionistComponent} from './inner-items/new-recetionist/new-recetionist.component';


@Component({
  selector: 'app-receptionist-tool-bar',
  imports: [
    Dialog,
    NewUserComponent,
    ViewUserLogComponent,
    NewUserComponent,
    ViewUserLogComponent,
    NewRecetionistComponent,
  ],
  templateUrl: './receptionist-tool-bar.component.html',
  styleUrl: './receptionist-tool-bar.component.scss',
  standalone:true
})
export class ReceptionistToolBarComponent {

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
