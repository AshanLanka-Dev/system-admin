import {Component, EventEmitter, OnInit, Output, signal, ViewChild} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators, ɵFormGroupRawValue,
  ɵGetProperty,
  ɵTypedOrUntyped
} from '@angular/forms';
import {CountryISO, NgxIntlTelInputModule, PhoneNumberFormat, SearchCountryField} from 'ngx-intl-tel-input';
import {Select} from 'primeng/select';
import {NgClass, NgIf, NgStyle} from '@angular/common';
import {PrograssSpinnerComponent} from '../../../../../../components/prograss-spinner/prograss-spinner.component';
import {InputNumber} from 'primeng/inputnumber';
import {TokenService} from '../../../../../../services/token.service';
import {Router} from '@angular/router';
import {ButtonDirective} from 'primeng/button';
import {firstValueFrom} from 'rxjs';
import {DatePicker} from 'primeng/datepicker';
import {RequestInstructorDTO} from '../../../../../../dto/request-instructor-dto';
import {Dialog} from 'primeng/dialog';
import {AvatarDialogComponent} from './inner-items/avatar-dialog/avatar-dialog.component';
import {AvatarService} from '../../../../../../services/avatar-service/avatar.service';
import {NgxSkeletonLoaderComponent} from 'ngx-skeleton-loader';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../../../../services/admin/admin.service';
import {RequestAdminDTO} from '../../../../../../services/admin/dto';

interface Countries {
  name: string,
  code: string,
  flag: any
}

@Component({
  selector: 'app-profile-home',
  imports: [
    InputText,
    FormsModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    Select,
    NgClass,
    NgStyle,
    PrograssSpinnerComponent,
    NgIf,
    InputNumber,
    // ButtonDirective,
    DatePicker,
    Dialog,
    AvatarDialogComponent,
    NgxSkeletonLoaderComponent
  ],
  templateUrl: './profile-home.component.html',
  standalone: true,
  styleUrl: './profile-home.component.scss'
})
export class ProfileHomeComponent implements OnInit {
  values: any;
  selectedCountry: any | undefined;
  allCountries: Countries[] = []
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Japan, CountryISO.SriLanka];
  form = new FormGroup({
    displayName: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    nic: new FormControl('', Validators.required),
    dob: new FormControl<Date | null>(null, Validators.required),
    phoneNumber: new FormControl(undefined, Validators.required),
    gender: new FormControl('', Validators.required),
    highQualification: new FormControl('', Validators.required),
    lanLevel: new FormControl('', Validators.required),
    teachingExperience: new FormControl('', Validators.required),
    specialization: new FormControl('', Validators.required),
    biography: new FormControl('', Validators.required),
    employmentType: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    dateJoined: new FormControl('', Validators.required),
    activeStatus: new FormControl('', Validators.required),
    country: new FormControl<Countries | undefined>(undefined, Validators.required),
    province: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
  });

  number: any;
  visibleDialog = false
  imageUrl = signal('')

  selectedUserId = signal('')

  isAcademicVisible = signal(true)

  isSubmit = signal(false)

  isAcademicInfo = signal({
    highQualification: '',
    lanLevel: '',
    teachingExperience: '',
    specialization: '',
    biography: ''
  })

  employmentTempData = signal({
    employmentType: '',
    designation: '',
  })

  addressData = signal({
    country: '',
    province: '',
    district: '',
    city: '',
    street: '',
    postalCode: ''
  })

  userId = signal<string>('')

  instructorId = signal('')

  adminId = signal('')

  neccesoryData = signal({nic: '', gender: '', dob: Date})

  isHover = signal(false);

  formChanged = signal(false);

  originalFormValues: any = null;

  isLoading = signal(false);

  genderData = signal<any[]>([]);

  lanLevelsData = signal<any[]>([]);

  specializationData = signal<any[]>([]);

  employmentData = signal<any[]>([]);

  isDataFetched = signal(false)

  roleFound = signal(false)

  postal: any;

  @ViewChild(AvatarDialogComponent) dialog!:AvatarDialogComponent;

  constructor(
    private _tokenService: TokenService,
    private _router: Router,
    private _AvatarService:AvatarService,
    private _messageService:MessageService,
    private _adminService:AdminService
  ) {
  }

  async ngOnInit() {
    this.isLoading.set(true);
    this.initializeDropdownData();

    try {
      // await this.loadAllCountries();
      // console.log("Countries loaded");
      //
      // await this.loadCountryByCode();
      // console.log("Country by code loaded");

      await this.loadUserData();
      console.log("User data loaded");

      await this.loadAvatar();
      console.log("User Avatar Loaded")

      await new Promise(resolve => setTimeout(resolve, 200));

      console.log(this.form.get('country')?.value)

      this.originalFormValues = JSON.parse(JSON.stringify(this.form.value));
      console.log("Original form values stored:", this.originalFormValues);

      console.log('last')
      this.form.valueChanges.subscribe(currentValues => {
        console.log(currentValues)

        const hasChanged = this.hasFormChanged(currentValues, this.originalFormValues);


        const isRequiredFieldsFilled = Boolean(currentValues.nic) &&
          Boolean(currentValues.dob) &&
          Boolean(currentValues.gender);


        if (!isRequiredFieldsFilled) {
          this.formChanged.set(false);
          return;
        }


        const isAttemptingAcademicInfo =
          Boolean(currentValues.highQualification) ||
          Boolean(currentValues.lanLevel) ||
          Boolean(currentValues.teachingExperience) ||
          Boolean(currentValues.specialization) ||
          Boolean(currentValues.biography);


        const isAcademicInfoComplete =
          Boolean(currentValues.highQualification) &&
          Boolean(currentValues.lanLevel) &&
          Boolean(currentValues.teachingExperience) &&
          Boolean(currentValues.specialization) &&
          Boolean(currentValues.biography);


        const isAttemptingEmploymentInfo =
          Boolean(currentValues.employmentType) ||
          Boolean(currentValues.designation);


        const isEmploymentInfoComplete =
          Boolean(currentValues.employmentType) &&
          Boolean(currentValues.designation);


        const isAttemptingAddressInfo =
          Boolean(currentValues.country) ||
          Boolean(currentValues.province) ||
          Boolean(currentValues.district) ||
          Boolean(currentValues.city) ||
          Boolean(currentValues.street) ||
          Boolean(currentValues.postalCode);


        const isAddressInfoComplete =
          Boolean(currentValues.country) &&
          Boolean(currentValues.province) &&
          Boolean(currentValues.district) &&
          Boolean(currentValues.city) &&
          Boolean(currentValues.street) &&
          Boolean(currentValues.postalCode);


        let isFormValid = hasChanged;


        if (isAttemptingAcademicInfo && !isAcademicInfoComplete) {
          isFormValid = false;
        }


        if (isAttemptingEmploymentInfo && !isEmploymentInfoComplete) {
          isFormValid = false;
        }


        if (isAttemptingAddressInfo && !isAddressInfoComplete) {
          isFormValid = false;
        }

        this.formChanged.set(isFormValid);
      });

      this.isLoading.set(false);
    } catch (error) {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Error When Initializing Form' });
      console.error('Error initializing form:', error);
      this.isLoading.set(false);

    }
  }

  initializeDropdownData() {
    this.genderData.set([
      {label: 'Male', value: 'MALE'},
      {label: 'Female', value: 'FEMALE'},
      {label: 'Other', value: 'OTHER'}
    ]);
    this.lanLevelsData.set([
      {label: 'Japanese Language N5', value: 'N5'},
      {label: 'Japanese Language N4', value: 'N4'},
      {label: 'Japanese Language N3', value: 'N3'},
      {label: 'Japanese Language N2', value: 'N2'},
      {label: 'Japanese Language N1', value: 'N1'}
    ]);
    this.specializationData.set([
      {label: 'Grammar', value: 'GRAMMAR'},
      {label: 'Vocabulary', value: 'VOCABULARY'},
      {label: 'Kanji', value: 'KANJI'},
      {label: 'Reading', value: 'READING'},
      {label: 'Listening', value: 'LISTENING'},
    ]);
    this.employmentData.set([
      {label: 'Full Time', value: 'FULL_TIME'},
      {label: 'Part Time', value: 'PART_TIME'},
    ]);
  }

  async loadUserData() {
    const selectedUser = this._tokenService.getUserData();
    console.log("User data fetched:", selectedUser);

    if (!selectedUser) {
      console.log("No user data found, redirecting to login");
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'No user data found, redirecting to login' });
      // this._router.navigate(['/security/process/login']);
      return;
    }

    // for (const item of selectedUser.roles) {
    //   if (item.role === "TRAINER") {
    //     this.isAcademicVisible.set(true)
    //     console.log('Loading trainer data');
    //     const response = await firstValueFrom(this._trainerService.getInstructorByUserId(selectedUser.userId));
    //     console.log("Trainer data received:", response);
    //     if (response && response.data) {
    //       await this.userId.set(response.data.applicationUser.userId)
    //       await this.instructorId.set(response.data.propertyId)
    //       await this.neccesoryData.set({
    //         nic: response.data.nic,
    //         gender: response.data.gender,
    //         dob: response.data.dob
    //       })
    //       if (response.data.academicAndProfessionalBackground) {
    //         await this.isAcademicInfo.set({
    //           highQualification: response.data.academicAndProfessionalBackground.highestQualification,
    //           lanLevel: response.data.academicAndProfessionalBackground.japaneseLanguageLevel,
    //           teachingExperience: response.data.academicAndProfessionalBackground.teachingExperience,
    //           specialization: response.data.academicAndProfessionalBackground.specialization,
    //           biography: response.data.academicAndProfessionalBackground.biography,
    //         })
    //       } else {
    //         this.isAcademicInfo.set({
    //           highQualification: '',
    //           lanLevel: '',
    //           teachingExperience: '',
    //           specialization: '',
    //           biography: '',
    //         })
    //       }
    //       if (response.data.employment) {
    //         this.employmentTempData.set({
    //           employmentType: response.data.employment.employmentType,
    //           designation: response.data.employment.designation
    //         })
    //         console.log(this.employmentTempData())
    //       } else {
    //         this.employmentTempData.set({
    //           employmentType: '',
    //           designation: ''
    //         })
    //       }
    //       if (response.data.address) {
    //         this.addressData.set({
    //           country: response.data.address.country,
    //           province: response.data.address.country,
    //           district: response.data.address.country,
    //           city: response.data.address.country,
    //           street: response.data.address.country,
    //           postalCode: response.data.address.country,
    //         })
    //       } else {
    //         this.addressData.set({
    //           country: '',
    //           province: '',
    //           district: '',
    //           city: '',
    //           street: '',
    //           postalCode: '',
    //         })
    //       }
    //       await this.populateTrainerForm(response.data);
    //       this.roleFound.set(true);
    //       return;
    //     }
    //   } else if (item.role === "ADMIN") {
    //     this.isAcademicVisible.set(false)
    //     console.log('Loading admin data');
    //     this._adminService.getAdminById(selectedUser?.userId).subscribe({
    //       next: async response => {
    //         console.log(response)
    //         console.log("Admin data received:", response);
    //         if (response && response.data) {
    //           await this.userId.set(response.data.applicationUser.userId)
    //           await this.adminId.set(response.data.propertyId)
    //           await this.neccesoryData.set({
    //             nic: response.data.nic,
    //             gender: response.data.gender,
    //             dob: response.data.dob
    //           })
    //           if (response.data.academicAndProfessionalBackground) {
    //             await this.isAcademicInfo.set({
    //               highQualification: response.data.academicAndProfessionalBackground.highestQualification,
    //               lanLevel: response.data.academicAndProfessionalBackground.japaneseLanguageLevel,
    //               teachingExperience: response.data.academicAndProfessionalBackground.teachingExperience,
    //               specialization: response.data.academicAndProfessionalBackground.specialization,
    //               biography: response.data.academicAndProfessionalBackground.biography,
    //             })
    //           } else {
    //             this.isAcademicInfo.set({
    //               highQualification: '',
    //               lanLevel: '',
    //               teachingExperience: '',
    //               specialization: '',
    //               biography: '',
    //             })
    //           }
    //           if (response.data.employment) {
    //             this.employmentTempData.set({
    //               employmentType: response.data.employment.employmentType,
    //               designation: response.data.employment.designation
    //             })
    //             console.log(this.employmentTempData())
    //           } else {
    //             this.employmentTempData.set({
    //               employmentType: '',
    //               designation: ''
    //             })
    //           }
    //           if (response.data.address) {
    //             this.addressData.set({
    //               country: response.data.address.country,
    //               province: response.data.address.country,
    //               district: response.data.address.country,
    //               city: response.data.address.country,
    //               street: response.data.address.country,
    //               postalCode: response.data.address.country,
    //             })
    //           } else {
    //             this.addressData.set({
    //               country: '',
    //               province: '',
    //               district: '',
    //               city: '',
    //               street: '',
    //               postalCode: '',
    //             })
    //           }
    //           await this.populateTrainerForm(response.data);
    //           // this.isLoading.set(false)
    //           this.roleFound.set(true);
    //           return;
    //         }
    //         await this.populateTrainerForm(response.data);
    //         this.roleFound.set(true);
    //       },
    //       error: err => {
    //         this._messageService.add({severity: 'warn', summary: 'Warning', detail: err.error.message});
    //         console.log(err)
    //       }
    //     })
    //     return;
    //   }
    // }

    if (!this.roleFound()) {
      console.log("No valid role found, redirecting");
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'No valid role found, redirecting' });
    }
  }

  loadAvatar():Promise<void>{
    return new Promise((resolve)=>{
      try{
        this._AvatarService.getAvatar(this._tokenService.getUserData().userId).subscribe({
          next:async res => {
            console.log(res)
            this.isLoading.set(false)
            this.imageUrl.set(res.data.resourceUrl)
            resolve()
          },
          error:err=>{
            this.isLoading.set(false)
            this._messageService.add({ severity: 'warn', summary: 'Warning', detail: err.error.message });
            console.log(err)
            resolve()
          }
        })
      }catch (e){
        this.isLoading.set(false)
        console.log(e)
        resolve()
      }
    })
  }

  populateTrainerForm(data: any): Promise<void> {
    return new Promise<void>((resolve) => {
      console.log("Populating form with data:", data);

      if (data.gender) this.form.get('gender')?.setValue(data.gender);
      if (data.academicAndProfessionalBackground) {
        if (data.academicAndProfessionalBackground.japaneseLanguageLevel)
          this.form.get('lanLevel')?.setValue(data.academicAndProfessionalBackground.japaneseLanguageLevel);
        if (data.academicAndProfessionalBackground.specialization)
          this.form.get('specialization')?.setValue(data.academicAndProfessionalBackground.specialization);
        if (data.academicAndProfessionalBackground.highestQualification)
          this.form.get('highQualification')?.setValue(data.academicAndProfessionalBackground.highestQualification);
        if (data.academicAndProfessionalBackground.teachingExperience)
          this.form.get('teachingExperience')?.setValue(data.academicAndProfessionalBackground.teachingExperience);
        if (data.academicAndProfessionalBackground.biography)
          this.form.get('biography')?.setValue(data.academicAndProfessionalBackground.biography);
      }
      if (data.employment.employmentType) this.form.get('employmentType')?.setValue(data.employment.employmentType);
      if (data.displayName) this.form.get('displayName')?.setValue(data.displayName);
      if (data.applicationUser.fullName) this.form.get('fullName')?.setValue(data.applicationUser.fullName);
      if (data.applicationUser.username) this.form.get('email')?.setValue(data.applicationUser.username);
      if (data.nic) this.form.get('nic')?.setValue(data.nic);
      if (data.dob) this.form.get('dob')?.setValue(new Date(data.dob));
      if (data.applicationUser.phoneNumberWithCountryCode)
        this.form.get('phoneNumber')?.setValue(data.applicationUser.phoneNumberWithCountryCode);
      if (data.employment.designation) this.form.get('designation')?.setValue(data.employment.designation);
      if (data.employment.dateJoined) this.form.get('dateJoined')?.setValue(data.employment.dateJoined);
      if (data.employment.activeStatus)
        this.form.get('activeStatus')?.setValue(data.employment.activeStatus ? 'Active' : 'Deactivated');
      if (data.address) {
        if (data.address.country) {
          let countryData = this.allCountries.find(r => r.name === data.address.country);
          this.form.get('country')?.setValue(countryData)
          this.selectedCountry = countryData
          console.log(this.selectedCountry)
        }

        if (data.address.province) this.form.get('province')?.setValue(data.address.province);
        if (data.address.district) this.form.get('district')?.setValue(data.address.district);
        if (data.address.city) this.form.get('city')?.setValue(data.address.city);
        if (data.address.street) this.form.get('street')?.setValue(data.address.street);
        if (data.address.postalCode) this.form.get('postalCode')?.setValue(data.address.postalCode);
      }
      this.isDataFetched.set(true);
      console.log("Form populated successfully");
      resolve();
    });
  }

  hasFormChanged(currentValues: any, originalValues: any): boolean {
    if (!originalValues || !currentValues) return false;

    for (const key in currentValues) {
      if (currentValues.hasOwnProperty(key)) {
        if (currentValues[key] instanceof Date && originalValues[key]) {
          const currentDate = new Date(currentValues[key]).getTime();
          const originalDate =
            originalValues[key] instanceof Date
              ? originalValues[key].getTime()
              : new Date(originalValues[key]).getTime();

          if (currentDate !== originalDate) {
            console.log(`Field ${key} changed: ${originalDate} -> ${currentDate}`);
            return true;
          }
        } else if (key === 'phoneNumber' && typeof currentValues[key] === 'object' && currentValues[key] !== null) {
          const currentPhone = JSON.stringify(currentValues[key]);
          const originalPhone = JSON.stringify(originalValues[key]);
          if (currentPhone !== originalPhone) {
            console.log(`Phone number changed: ${originalPhone} -> ${currentPhone}`);
            return true;
          }
        } else if (JSON.stringify(currentValues[key]) !== JSON.stringify(originalValues[key])) {
          console.log(`Field ${key} changed: ${JSON.stringify(originalValues[key])} -> ${JSON.stringify(currentValues[key])}`);
          return true;
        }
      }
    }

    return false;
  }

  // async loadAllCountries(): Promise<void> {
  //   return new Promise<void>((resolve) => {
  //     this.countryData.getCountries().subscribe({
  //       next: (res) => {
  //         this.allCountries = res.map((result: any) => ({
  //           name: result.name.common,
  //           code: result.idd?.root + (result.idd?.suffixes ? result.idd.suffixes[0] : ''),
  //           flag: result.flags.svg,
  //         }));
  //         console.log('Countries loaded:', this.allCountries.length);
  //         resolve();
  //       },
  //       error: (err) => {
  //         this._messageService.add({ severity: 'warn', summary: 'Warning', detail: err.error.message });
  //         console.error('Error loading countries:', err);
  //         resolve(err);
  //       }
  //     });
  //   });
  // }

  // async loadCountryByCode(): Promise<void> {
  //   return new Promise<void>((resolve) => {
  //     this.countryData.getCountryByCode('JP').subscribe({
  //       next: (res) => {
  //         const countryData = res.map((result: any) => ({
  //           name: result.name.common,
  //           code: result.idd?.root + (result.idd?.suffixes ? result.idd.suffixes[0] : ''),
  //           flag: result.flags.svg,
  //         }))[0];
  //
  //         this.selectedCountry = this.allCountries.find(c => c.code === countryData.code);
  //         console.log('Country by code loaded:', this.selectedCountry);
  //         resolve();
  //       },
  //       error: (err) => {
  //         this._messageService.add({ severity: 'warn', summary: 'Warning', detail: err.error.message });
  //         console.error('Error loading country by code:', err);
  //         resolve(err);
  //       }
  //     });
  //   });
  // }

  async loadAdminData(selectedUser: any): Promise<void> {
    return new Promise<void>( (resolve) => {

    });
  }

  async formSubmit() {
    if (!this.formChanged() || this.isLoading()) {
      console.log('Form submission blocked: No changes or loading');
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Form submission blocked: No changes or loading' });
      return;
    }

    this.isLoading.set(true);
    console.log('Submitting form values:', this.form.value);

    try {
      const selectedUser = this._tokenService.getUserData();

      if (selectedUser) {
        for (const item of selectedUser.roles) {
          if (item.role === "TRAINER") {
            // Instructor update logic
            const payload: RequestInstructorDTO = {
              userId: this.userId(),
              displayName: this.form.get('displayName')?.value || null,
              email: this.form.get('email')?.value || null,
              dob: this.formatDate(this.form.get('dob')?.value) || null,
              nic: this.form.get('nic')?.value || null,
              gender: this.form.get('gender')?.value || null,
              address: {
                street: this.form.get('street')?.value || null,
                city: this.form.get('city')?.value || null,
                district: this.form.get('district')?.value || null,
                province: this.form.get('province')?.value || null,
                postalCode: this.form.get('postalCode')?.value || null,
                country: this.form.get('country')?.value?.name || null,
              },
              employment: {
                employmentType: this.form.get('employmentType')?.value || null,
                designation: this.form.get('designation')?.value || null,
              },
              academicAndProfessionalBackground: {
                highestQualification: this.form.get('highQualification')?.value || null,
                japaneseLanguageLevel: this.form.get('lanLevel')?.value || null,
                teachingExperience: this.form.get('teachingExperience')?.value || null,
                specialization: this.form.get('specialization')?.value || null,
                biography: this.form.get('biography')?.value || null,
              },
            };

            // await this._trainerService.updateInstructor(this.instructorId(), payload).subscribe({
            //   next: async res => {
            //     console.log(res);
            //     this.isSubmit.set(true);
            //     this.originalFormValues = JSON.parse(JSON.stringify(this.form.value));
            //     this.formChanged.set(false);
            //     this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully' });
            //   },
            //   error: err => {
            //     console.log(err);
            //     this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update profile' });
            //   }
            // });
          } else if (item.role === "ADMIN") {
            // Admin update logic - fixed to match RequestAdminDTO interface
            const phoneNumberObj = this.form.get('phoneNumber')?.value;

            // Get employment type value from form and convert to valid enum or null
            const employmentTypeValue = this.convertEmploymentType(this.form.get('employmentType')?.value);

            // Admin update logic - fixed to match RequestAdminDTO interface
            const adminPayload: RequestAdminDTO = {
              userId: this.userId(),
              // Apply correct methods for phone data
              phoneNumber: this.formatPhoneNumberData(phoneNumberObj),
              countryCode: this.extractDialCode(phoneNumberObj),
              fullName: this.form.get('fullName')?.value || null,
              displayName: this.form.get('displayName')?.value || null,
              email: this.form.get('email')?.value || null,
              dob: this.formatDate(this.form.get('dob')?.value) || null,
              nic: this.form.get('nic')?.value || null,
              gender: this.form.get('gender')?.value as 'MALE' | 'FEMALE' | 'OTHER' | null,
              address: {
                street: this.form.get('street')?.value || null,
                city: this.form.get('city')?.value || null,
                district: this.form.get('district')?.value || null,
                province: this.form.get('province')?.value || null,
                postalCode: this.form.get('postalCode')?.value || null,
                country: this.form.get('country')?.value?.name || null,
              },
              employment: {
                // Use pre-validated employment type value
                employmentType: employmentTypeValue,
                designation: this.form.get('designation')?.value || null,
              }
            };

            console.log('DTO', adminPayload);

            await this._adminService.updateAdmin(this.adminId(), adminPayload).subscribe({
              next: async res => {
                console.log(res);
                this.isSubmit.set(true);
                this.originalFormValues = JSON.parse(JSON.stringify(this.form.value));
                this.formChanged.set(false);
                this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully' });
              },
              error: err => {
                console.log(err);
                this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update profile' });
              }
            });
          }
        }
      }
    } catch (error) {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Error Submitting Form' });
      console.error('Error submitting form:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  extractDialCode(phoneNumberObj: any): string | null {
    // Check if phoneNumberObj exists and contains a dialCode property
    if (phoneNumberObj && phoneNumberObj.dialCode) {
      return phoneNumberObj.dialCode;
    }
    return null;
  }

  formatPhoneNumberData(phoneNumberObj: any): string | null {
    // Check if phoneNumberObj exists and contains an e164Number property
    if (phoneNumberObj && phoneNumberObj.e164Number) {
      return phoneNumberObj.e164Number;
    }
    return null;
  }

// Helper to safely convert employment type string to valid enum value
  convertEmploymentType(value: string | null | undefined): 'FULL_TIME' | 'PART_TIME' | null {
    if (value === 'FULL_TIME' || value === 'PART_TIME') {
      return value; // Already a valid enum value
    }
    return null; // For empty string, null, undefined, or any invalid value
  }

  formatDate = (date: ɵGetProperty<ɵTypedOrUntyped<{
    country: FormControl<Countries | undefined | null>;
    gender: FormControl<string | null>;
    lanLevel: FormControl<string | null>;
    employmentType: FormControl<string | null>;
    city: FormControl<string | null>;
    displayName: FormControl<string | null>;
    dateJoined: FormControl<string | null>;
    postalCode: FormControl<string | null>;
    fullName: FormControl<string | null>;
    nic: FormControl<string | null>;
    biography: FormControl<string | null>;
    teachingExperience: FormControl<string | null>;
    phoneNumber: FormControl<undefined | null>;
    activeStatus: FormControl<string | null>;
    province: FormControl<string | null>;
    dob: FormControl<Date | null>;
    street: FormControl<string | null>;
    district: FormControl<string | null>;
    highQualification: FormControl<string | null>;
    specialization: FormControl<string | null>;
    designation: FormControl<string | null>;
    email: FormControl<string | null>
  }, ɵFormGroupRawValue<{
    country: FormControl<Countries | undefined | null>;
    gender: FormControl<string | null>;
    lanLevel: FormControl<string | null>;
    employmentType: FormControl<string | null>;
    city: FormControl<string | null>;
    displayName: FormControl<string | null>;
    dateJoined: FormControl<string | null>;
    postalCode: FormControl<string | null>;
    fullName: FormControl<string | null>;
    nic: FormControl<string | null>;
    biography: FormControl<string | null>;
    teachingExperience: FormControl<string | null>;
    phoneNumber: FormControl<undefined | null>;
    activeStatus: FormControl<string | null>;
    province: FormControl<string | null>;
    dob: FormControl<Date | null>;
    street: FormControl<string | null>;
    district: FormControl<string | null>;
    highQualification: FormControl<string | null>;
    specialization: FormControl<string | null>;
    designation: FormControl<string | null>;
    email: FormControl<string | null>
  }>, any>, "dob"> | undefined): string | null => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  profileHoverEnter() {
    this.isHover.set(true);
  }

  profileHoverLeave() {
    this.isHover.set(false);
  }

  async openProfileUpload() {
    const selectedUser = this._tokenService.getUserData();
    await this.selectedUserId.set(selectedUser.userId)
    this.visibleDialog = true
  }

  avatarDialogHide() {
    this.selectedUserId.set('')
    this.dialog.onHide()
  }

  isClosedMethod(event: any) {
    if (event){
      this.visibleDialog = false
      this.dialog.onHide()
      this.loadAvatar();
    }
  }

  imageError() {
    const defaultImageUrl = '/images/dashboard/my-cources/img_d.png';
    this.imageUrl.set(defaultImageUrl)
  }
}
