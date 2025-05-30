import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-que-history-toolbar',
  imports: [],
  templateUrl: './que-history-toolbar.component.html',
  styleUrl: './que-history-toolbar.component.scss',
  standalone:true
})
export class QueHistoryToolbarComponent {

  @Output() reloadTable = new EventEmitter<void>();

  refreshList(){
    this.reloadTable.emit();
  }
}
