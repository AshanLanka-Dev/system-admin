import {Component, OnInit} from '@angular/core';
import {RightSideComponent} from '../ineer-components/right-side/right-side.component';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Router, RouterLink} from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {MessageService} from 'primeng/api';
import {NgIf} from '@angular/common';
import {PrograssSpinnerComponent} from '../../../../components/prograss-spinner/prograss-spinner.component';

@Component({
  selector: 'app-forgot-password',
  imports: [
    RightSideComponent,
    IconField,
    InputIcon,
    InputText,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    PrograssSpinnerComponent,
  ],
  templateUrl: './forgot-password.component.html',
  standalone: true,
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  loading: boolean = false;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService:UserService,
    private messageService:MessageService
  ) {
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitForm() {
    if (this.forgotPasswordForm.valid) {
      this.loading = true;
      const email = this.forgotPasswordForm.value.email.trim();

      this.userService.forgotPasswordSendVerificationCode(email)
        .subscribe({
          next: response => {
            this.loading = false;
            this.forgotPasswordForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message });
            setTimeout(() => {
              this.router.navigate(['/security/process/verify-password'], {
                queryParams: { email }
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
      this.loading = false;
      this.forgotPasswordForm.markAllAsTouched();

    }
  }

}
