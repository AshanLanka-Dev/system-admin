import {Component, OnInit} from '@angular/core';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {
  AbstractControl,
  FormBuilder,
  FormGroup, FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {RightSideComponent} from '../ineer-components/right-side/right-side.component';
import {Router, RouterLink} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import {UserService} from '../../../../services/user.service';
import {Message} from 'primeng/message';
import {PrograssSpinnerComponent} from '../../../../components/prograss-spinner/prograss-spinner.component';
import {RequestApplicationUserPasswordResetDTO} from '../../../../dto/request-application-user-password-reset-dto';
// import {passwordMatchValidator} from '../register/register.component';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  imports: [
    IconField,
    InputIcon,
    InputText,
    ReactiveFormsModule,
    RightSideComponent,
    FormsModule,
    NgClass,
    NgIf,
    Message,
    PrograssSpinnerComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  standalone: true,
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  isEyeNewHidden = true;
  isEyeConfirmHidden = true;
  loading = false;
  invalidState: boolean = false;
  errorMessage: string = '';
  email:string='';
  code :string='';

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService:MessageService
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: passwordMatchValidator()});
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.code = params['code'];
    });
  }

  eyeChangeNewPassword() {
    this.isEyeNewHidden = !this.isEyeNewHidden;
  }

  eyeChangeConfirmPassword() {
    this.isEyeConfirmHidden = !this.isEyeConfirmHidden;
  }

  submitForm() {
    if (this.resetForm.valid) {
      console.log(this.resetForm.value);
      this._router.navigate(['/security/process/login']);

      this.loading = false;

      const dto :RequestApplicationUserPasswordResetDTO = {
        email:this.email,
        code:this.code,
        password: this.resetForm.get('confirmPassword')?.value.trim(),
      }

      this.userService.passwordReset(dto)
        .subscribe({
          next: response => {
            this.loading = false;
            this.resetForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message });
            setTimeout(() => {
              this._router.navigate(['/security/process/login']);
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
      this.invalidState = true;
      const formErrors = this.resetForm.errors;

      if (formErrors?.['passwordMismatch']) {
        this.errorMessage = 'Password and Confirm Password must be the same.';
      }
      this.resetForm.markAllAsTouched();
    }
  }
}

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return newPassword && confirmPassword && newPassword !== confirmPassword
      ? {passwordMismatch: true}
      : null;
  };
}
