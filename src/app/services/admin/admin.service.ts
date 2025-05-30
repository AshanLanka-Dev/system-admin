import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RequestApplicationUserByAdminDTO } from '../../dto/request-application-user-by-admin-dto';
import { RequestUpdateApplicationUserDTO } from '../../dto/request-update-application-user-dto';
import {RequestInstructorDTO} from '../../dto/request-instructor-dto';
import {RequestAdminDTO} from './dto';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = environment.baseUrl + 'admin';

  constructor(private http: HttpClient) {}

  // Create user by admin
  public createUserByAdmin(dto: RequestApplicationUserByAdminDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/create/user`, dto);
  }

  // Update user by admin
  public updateUserByAdmin(userId: string, dto: RequestUpdateApplicationUserDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/user/${userId}`, dto);
  }

  public updateAdmin(adminId: string, dto: RequestAdminDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/${adminId}`, dto);
  }

  // Delete user by admin
  public deleteUserByAdmin(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/user/${userId}`);
  }

  // Get all system admins
  public getAllSystemAdmins(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  public getAdminById(userId:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/${userId}`)
  }

  // Assign or remove user role
  public changeUserRoleOfApplicationUser(roleId: string, userId: string, active: boolean): Observable<any> {
    const params = new HttpParams()
      .set('roleId', roleId)
      .set('userId', userId)
      .set('active', active);
    return this.http.post(`${this.baseUrl}/role/assign`, null, { params });
  }
}
