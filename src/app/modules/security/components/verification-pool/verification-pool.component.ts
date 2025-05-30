import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PrograssSpinnerComponent} from '../../../../components/prograss-spinner/prograss-spinner.component';
import {TokenService} from '../../../../services/token.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-verification-pool',
  imports: [
    PrograssSpinnerComponent
  ],
  templateUrl: './verification-pool.component.html',
  styleUrl: './verification-pool.component.scss',
  standalone:true
})
export class VerificationPoolComponent implements OnInit{

  constructor(
    private router:Router,
    private tokenService:TokenService,
    private messageService:MessageService
  ) {
  }

  ngOnInit(): void {

          setTimeout(() => {
            this.router.navigate(['/dashboard/process/home']);
          },2500);

    // if(this.tokenService.isAdmin() || this.tokenService.isTrainer() ){
    //   setTimeout(() => {
    //     this.router.navigate(['/dashboard/process/home']);
    //   },1500);
    // }
    // else{
    //   this.router.navigate(['/security/process/login']);
    //   this.messageService.add({ severity: 'warn', summary: 'Warn', detail: `Your session has expired. Please log in again.` });
    // }
  }



}
