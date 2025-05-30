import {Component, EventEmitter, Output} from '@angular/core';
import {Message} from 'primeng/message';

@Component({
  selector: 'app-delete-dialog-content',
  imports: [
    // Message
  ],
  templateUrl: './delete-dialog-content.component.html',
  styleUrl: './delete-dialog-content.component.scss',
  standalone:true
})
export class DeleteDialogContentComponent {
  @Output() cansel = new EventEmitter<void>();
  @Output() deleteConfirmed = new EventEmitter<void>();


  canselClicked(){
    this.cansel.emit();
  }

  deleteConfirm(){
    this.deleteConfirmed.emit();
  }
}

