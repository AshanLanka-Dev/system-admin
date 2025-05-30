import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-que-status',
  imports: [FormsModule, ToggleSwitch],
  templateUrl: './que-status.component.html',
  styleUrl: './que-status.component.scss',
  standalone:true
})
export class QueStatusComponent implements OnInit{

  @Input() selectedUser:any;
  @Output() reloadTable = new EventEmitter<void>();

  checked: boolean = false;

  constructor(
    private messageService:MessageService

  ) {
  }

  ngOnInit(): void {
    // console.log( 'selected User stetus' , this.selectedUser )
    this.checked = this.selectedUser?.employment?.activeStatus;
  }

  onToggleChange(){
    // this.instructorService.changeInstructorStatus(this.selectedUser?.propertyId).subscribe({
    //   next: response => {
    //     this.reloadTable.emit();
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message });
    //   },
    //   error: error => {
    //     this.messageService.add({ severity: 'warn', summary: 'Warn', detail: error?.error?.message });
    //   }
    // });
  }

}
