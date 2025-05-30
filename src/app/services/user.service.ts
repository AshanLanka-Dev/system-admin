import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {map, Observable} from "rxjs";
import {environment} from '../../environments/environment';
import {RequestApplicationUserDTO} from '../dto/request-application-user-dto';
import { RequestApplicationUserPasswordResetDTO} from '../dto/request-application-user-password-reset-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl + 'users';
  private loginUrl  = environment.loginUrl;

  constructor(private http: HttpClient) { }


  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl + 'login', {
        username: email, password: password
      },
      {observe: 'response' as 'body'})
      .pipe(map(data => {
        return data;
      }));
  }

  //  Register a visitor
  public register(dto: RequestApplicationUserDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/visitor/register`, dto);
  }

  //  Send reset password verification code
  public forgotPasswordSendVerificationCode(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.baseUrl}/forgot-password-request-code`, null, { params });
  }

  //  Verify reset password OTP
  public resetPassword(otp: string, email: string): Observable<any> {
    const params = new HttpParams()
      .set('otp', otp)
      .set('email', email);
    return this.http.post(`${this.baseUrl}/verify-reset`, null, { params });
  }

  //  Reset the password after verification
  public passwordReset(dto: RequestApplicationUserPasswordResetDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, dto);
  }

  // Get user role by username
  public getApplicationUserRoleByUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/role/${username}`);
  }
}
