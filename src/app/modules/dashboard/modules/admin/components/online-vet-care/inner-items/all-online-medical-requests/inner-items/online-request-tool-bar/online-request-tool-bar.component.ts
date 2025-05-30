import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-online-request-tool-bar',
  imports: [

  ],
  templateUrl: './online-request-tool-bar.component.html',
  styleUrl: './online-request-tool-bar.component.scss',
  standalone:true
})
export class OnlineRequestToolBarComponent {

  @Output() reloadTable = new EventEmitter<void>();


  refreshList(){
    this.reloadTable.emit();
  }

}
