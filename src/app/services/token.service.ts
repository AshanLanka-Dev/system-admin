import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  // Token Methods
  public isTokenExists(): boolean {
    return this.cookieService.check('NozomiAdminToken');
  }

  public getToken(): any {
    return this.cookieService.get('NozomiAdminToken');
  }

  public creatNozomiAdminToken(token: any): void {
    const expiryDate = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
    this.removeNozomiAdminToken();
    this.cookieService.set('NozomiAdminToken', token, { expires: expiryDate });
  }

  public removeNozomiAdminToken(): void {
    this.cookieService.delete('NozomiAdminToken');
  }

  // User Data Methods
  public saveUserData(user: any): void {
    const expiryDate = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
    this.cookieService.set('NozomiUserData', JSON.stringify(user), { expires: expiryDate });
  }

  public getUserData(): any {
    const user = this.cookieService.get('NozomiUserData');
    return user ? JSON.parse(user) : null;
  }

  public removeUserData(): void {
    this.cookieService.delete('NozomiUserData');
  }

  // Logout Method
  public logout(): void {
    this.removeNozomiAdminToken();
    this.removeUserData();

    // Add any other app-related cookies here
    this.cookieService.delete('role'); // if you stored role separately
    this.cookieService.deleteAll(); // optionally, clears all cookies
  }

  public isAdmin(): boolean {
    const user = this.getUserData();
    if (!user || !user.roles || !Array.isArray(user.roles)) {
      return false;
    }

    return user.roles.some((r: any) => r.role === 'ADMIN');
  }

  public isTrainer(): boolean {
    const user = this.getUserData();
    if (!user || !user.roles || !Array.isArray(user.roles)) {
      return false;
    }

    return user.roles.some((r: any) => r.role === 'TRAINER');
  }
}
