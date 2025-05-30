import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-pending-online-req-tool-bar',
  imports: [],
  templateUrl: './pending-online-req-tool-bar.component.html',
  styleUrl: './pending-online-req-tool-bar.component.scss',
  standalone:true
})
export class PendingOnlineReqToolBarComponent {

  @Output() reloadTable = new EventEmitter<void>();

  refreshList(){
    this.reloadTable.emit();
  }

}
