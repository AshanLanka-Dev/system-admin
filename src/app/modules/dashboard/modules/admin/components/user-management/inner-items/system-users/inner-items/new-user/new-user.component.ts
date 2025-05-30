import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputIcon} from 'primeng/inputicon';
import {IconField} from 'primeng/iconfield';
import {InputText} from 'primeng/inputtext';
import { NgxIntlTelInputModule, CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Message} from 'primeng/message';
import {MessageService} from 'primeng/api';
import {PrograssSpinnerComponent} from '../../../../../../../../../../components/prograss-spinner/prograss-spinner.component';
import{AdminService} from '../../../../../../../../../../services/admin/admin.service';
import {RequestApplicationUserByAdminDTO} from '../../../../../../../../../../dto/request-application-user-by-admin-dto';
import {ViewUserComponent} from '../view-user/view-user.component';

export interface ContactInfo {
  countryCode: string
  dialCode: string
  e164Number: string
  internationalNumber: string
  nationalNumber: string
  number: string }

@Component({
  selector: 'app-new-user',
  imports: [
    // NgClass,
    FormsModule,
    // InputIcon,
    IconField,
    InputText,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    // Message,
    NgIf,
    PrograssSpinnerComponent,
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss',
  standalone:true
})
export class NewUserComponent implements OnInit {

  @Output() createNewUser = new EventEmitter<void>();

  newSystemUserForm!: FormGroup;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Japan, CountryISO.SriLanka];
  loading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private adminService: AdminService
  ) {

  }

  ngOnInit(): void {
    this.newSystemUserForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [undefined, Validators.required],
    },);
  }

  createAdmin(): void {

    if (this.newSystemUserForm.valid) {
      this.loading = true;

      const phone = this.newSystemUserForm.value.phone as ContactInfo | null;

      console.log('phone data ', phone);

      const dto: RequestApplicationUserByAdminDTO = {
        username: this.newSystemUserForm.get('email')?.value,
        fullName: this.newSystemUserForm.get('fullName')?.value,
        countryCode: phone!.number,
        phoneNumber: phone!.e164Number,
        role: 'ADMIN'
      }

      this.adminService.createUserByAdmin(dto)
        .subscribe({
          next: response => {
            this.loading = false;
            this.newSystemUserForm.reset();
            this.createNewUser.emit();
            this.messageService.add({severity: 'success', summary: 'Success', detail: response?.message});
          },
          error: error => {
            this.loading = false;
            console.log('error', error)
            this.messageService.add({severity: 'warn', summary: 'Warn', detail: error?.error?.message});
          }
        });
    }else {
      this.loading = false;
      this.newSystemUserForm.markAllAsTouched();
    }
  }
  resetForm() {
    this.newSystemUserForm.reset();
  }
}
