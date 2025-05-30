import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = environment.baseUrl + 'dashboard-details';

  constructor(private http: HttpClient) {}

  // Get student enrolled courses by ID
  public getStudentEnrolledCourses(studentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/enrolled/list/${studentId}`);
  }

  // Get student dashboard details with optional intakeId
  public getStudentDashboardDetails(studentId: string, intakeId: string = ''): Observable<any> {
    const params = new HttpParams()
      .set('studentId', studentId)
      .set('intakeId', intakeId);
    return this.http.get(`${this.baseUrl}/student`, { params });
  }

  // Get monthly revenue by year
  public getMonthlyRevenue(year: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/revenue/monthly/${year}`);
  }


  // Get total revenue
  public getTotalRevenue(): Observable<any> {
    return this.http.get(`${this.baseUrl}/revenue/total`);
  }

  // Get admin dashboard details
  public getAdminDashboardDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin`);
  }

  // Get instructor assigned courses by ID
  public getInstructorAssignedCourses(instructorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/instructor/assignation/list/${instructorId}`);
  }

  // Get instructor dashboard details with optional intakeId
  public getInstructorDashboardDetails(instructorId: string, intakeId: string = ''): Observable<any> {
    const params = new HttpParams()
      .set('instructorId', instructorId)
      .set('intakeId', intakeId);
    return this.http.get(`${this.baseUrl}/instructorId`, { params });
  }

  // ✅ Updated to pass year as path variable
  public getYearlyRevenue(year: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/revenue/yearly/${year}`);
  }
}
