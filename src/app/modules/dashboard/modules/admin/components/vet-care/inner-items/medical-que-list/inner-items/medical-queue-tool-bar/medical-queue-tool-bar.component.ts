import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-medical-queue-tool-bar',
  imports: [
  ],
  templateUrl: './medical-queue-tool-bar.component.html',
  styleUrl: './medical-queue-tool-bar.component.scss',
  standalone:true
})
export class MedicalQueueToolBarComponent {

  @Output() reloadTable = new EventEmitter<void>();

  refreshList(){
    this.reloadTable.emit();
  }
}
