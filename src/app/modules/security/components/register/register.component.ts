import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RightSideComponent} from '../ineer-components/right-side/right-side.component';
import {NgClass, NgIf} from '@angular/common';
import {AbstractControl, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn} from '@angular/forms';
import {InputIcon} from 'primeng/inputicon';
import {IconField} from 'primeng/iconfield';
import {InputText} from 'primeng/inputtext';
import { NgxIntlTelInputModule, CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Message} from 'primeng/message';
import {UserService} from '../../../../services/user.service';
import {RequestApplicationUserDTO} from '../../../../dto/request-application-user-dto';
import {MessageService} from 'primeng/api';
import {Router, RouterLink} from "@angular/router";
import {PrograssSpinnerComponent} from '../../../../components/prograss-spinner/prograss-spinner.component';

export interface ContactInfo {
  countryCode: string
  dialCode: string
  e164Number: string
  internationalNumber: string
  nationalNumber: string
  number: string }

@Component({
  selector: 'app-register',
  imports: [
    RightSideComponent,
    RouterLink,
    NgClass,
    FormsModule,
    InputIcon,
    IconField,
    InputText,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    Message,
    NgIf,
    PrograssSpinnerComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone:true
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Japan, CountryISO.SriLanka];
  isEyeNewHidden = true
  isEyeConfirmHidden = true
  loading:boolean=false;
  invalidState:boolean = false;
  errorMessage:string='';

  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private messageService: MessageService,
    private router:Router,

  ) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [undefined, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: passwordMatchValidator() });

  }


  togglePasswordVisibility(): void {
    this.isEyeNewHidden = !this.isEyeNewHidden;
  }

  toggleConfirmPasswordVisibility(): void {
    this.isEyeConfirmHidden = !this.isEyeConfirmHidden;
  }



  register(): void {
    this.invalidState = false;
    this.loading = true;

    if (this.registerForm.invalid) {

      this.loading = false;
      this.invalidState = true;
      const formErrors = this.registerForm.errors;

      if (formErrors?.['passwordMismatch']) {
        this.errorMessage = 'Password and Confirm Password must be the same.';
      }

      this.registerForm.markAllAsTouched();

    } else {
      this.invalidState = false
      const phone  = this.registerForm.value.phone as ContactInfo | null;

      const dto:RequestApplicationUserDTO = {
        username : this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        fullName: this.registerForm.get('fullName')?.value,
        countryCode: phone!.dialCode,
        phoneNumber: phone!.e164Number,
        role: 'STUDENT'
      }

      // this.userService.register(dto)
      //   .subscribe({
      //     next: response => {
      //       this.loading = false;
      //       this.registerForm.reset();
      //       this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message });
      //       setTimeout(() => {
      //         this.router.navigate(['/security/process/login']);
      //       },600);
      //     },
      //     error: error  => {
      //       this.loading = false;
      //       console.log('error',error)
      //       this.messageService.add({ severity: 'warn', summary: 'Warn', detail: error?.error?.message });
      //     }
      //   });

    }
  }
}

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  };
}
