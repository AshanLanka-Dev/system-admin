import {Component, OnInit} from '@angular/core';
import{RightSideComponent} from '../ineer-components/right-side/right-side.component';
import {UserService} from '../../../../services/user.service';
import {first} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {TokenService} from '../../../../services/token.service';
import {Router, RouterLink} from "@angular/router";
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {NgClass, NgIf} from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
import {PrograssSpinnerComponent} from '../../../../components/prograss-spinner/prograss-spinner.component';
import {Message} from 'primeng/message';
import {data} from 'autoprefixer';



@Component({
  selector: 'app-login',
  imports: [RightSideComponent, PrograssSpinnerComponent, Toast, ButtonModule, IconField, InputIcon, InputText, FormsModule, NgClass, RouterLink, ReactiveFormsModule, NgIf, Message],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone:true
})
export class LoginComponent  implements OnInit{


  loginForm!: FormGroup;
  loading:boolean=false;
  invalidState:boolean = false;
  errorMessage:string='';
  isEyeNewHidden = true


  constructor(
    private userService:UserService,
    private tokenService:TokenService,
    private router:Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(  this.tokenService.isTokenExists()){
      this.router.navigate(['/security/process/verification']);
    }
  }

  eyeChangeNewPassword() {
    this.isEyeNewHidden = !this.isEyeNewHidden;
  }

  login() {


    this.router.navigate(['/security/process/verification']);



    // this.invalidState = false;
    // this.loading = true;
    // if (this.loginForm.invalid) {
    //   this.invalidState = true;
    //   this.errorMessage = 'Please insert all required details';
    //   this.loading = false;
    //   return;
    // }
    //
    // const { email, password } = this.loginForm.value;
    //
    // this.userService
    //   .login(email.trim(), password.trim())
    //   .pipe(first())
    //   .subscribe({
    //     next: (data: HttpResponse<any>) => {
    //       this.loading = false;
    //       this.tokenService.saveUserData(data?.body?.data);
    //       console.log('userData', this.tokenService.getUserData());
    //       this.tokenService.creatNozomiAdminToken(data.headers.get('Authorization')!);
    //
    //       console.log("Welcome Back!");
    //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Welcome Back!' });
    //       this.loginForm.reset();
    //       setTimeout(() => {
    //         this.router.navigate(['/security/process/verification']);
    //       },500);
    //     },
    //     error: () => {
    //       this.loading = false;
    //       this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'username or password incorrect!' });
    //       console.log("username or password incorrect!");
    //     }
    //   });
  }



}
