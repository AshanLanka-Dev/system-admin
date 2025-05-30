import {Component,  OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, RouterLink ,ActivatedRoute  } from '@angular/router';
import {RightSideComponent} from '../ineer-components/right-side/right-side.component';
import { InputOtp } from 'primeng/inputotp';
import {UserService} from '../../../../services/user.service';
import {MessageService} from 'primeng/api';
import {NgIf} from '@angular/common';
import {PrograssSpinnerComponent} from '../../../../components/prograss-spinner/prograss-spinner.component';

@Component({
  selector: 'app-verify-password',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RightSideComponent,
    InputOtp,
    NgIf,
    PrograssSpinnerComponent,
  ],
  templateUrl: './verify-password.component.html',
  styleUrl: './verify-password.component.scss',
  standalone:true
})
export class VerifyPasswordComponent implements OnInit{
  verifyForm!: FormGroup;

  loading:boolean=false;
  email:string='';


  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private userService:UserService,
    private messageService:MessageService,
    private route: ActivatedRoute

  ) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }
  ngOnInit(): void {
    this.verifyForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4)]]  // adjust minLength to OTP length
    });
  }

  submitForm() {

    if (this.verifyForm.valid) {
      this.loading = true;
      console.log('OTP entered:', this.verifyForm.value.otp);

      this._router.navigate(['/security/process/reset-password']);

      const otp = this.verifyForm.value.otp.trim();

      this.userService.resetPassword(otp , this.email)
        .subscribe({
          next: response => {
            this.loading = false;
            this.verifyForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message });
            setTimeout(() => {
              this._router.navigate(['/security/process/reset-password'],{
                queryParams: { email: this.email, code: otp }
              });
            },600);
          },
          error: error  => {
            this.loading = false;
            console.log('error',error)
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail: error?.error?.message });
          }
        });

    } else {
      this.verifyForm.markAllAsTouched();
    }
  }

}
