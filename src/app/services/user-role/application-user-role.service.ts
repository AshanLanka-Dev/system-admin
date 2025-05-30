import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {RequestApplicationRoleDTO} from '../../dto/request-application-role-dto';

@Injectable({
  providedIn: 'root'
})
export class ApplicationUserRoleService {
  private baseUrl = environment.baseUrl + 'roles';

  constructor(private http: HttpClient) {}

  // Get all roles (visitor)
  public getAllRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/visitor`);
  }

  // Create a new role
  public createRole(dto: RequestApplicationRoleDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}`, dto);
  }

  // Update existing role
  public updateRole(roleId: string, dto: RequestApplicationRoleDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/${roleId}`, dto);
  }

  // Delete a role
  public deleteRole(roleId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${roleId}`);
  }
}
