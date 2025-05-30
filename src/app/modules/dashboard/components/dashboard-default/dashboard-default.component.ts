import {Component, OnInit} from '@angular/core';
import {SelectModule} from 'primeng/select';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Select} from 'primeng/select';
import {StatCardsComponent} from './inner-items/stat-cards/stat-cards.component';
import {ResultChartComponent} from './inner-items/result-chart/result-chart.component';
import {OverviewTableComponent} from './inner-items/overview-table/overview-table.component';
import {TokenService} from '../../../../services/token.service';
import {NgIf} from '@angular/common';
import {MessageService} from 'primeng/api';
import {DashboardService} from '../../../../services/dashboard/dashboard.service';
import {IconField} from 'primeng/iconfield';
import {AutoComplete} from 'primeng/autocomplete';
import {TrainerCardsComponent} from './inner-items/trainer-cards/trainer-cards.component';
import {AdminCardsComponent} from './inner-items/admin-cards/admin-cards.component';
import {RevanueChartComponent} from './inner-items/revanue-chart/revanue-chart.component';
import {PrograssSpinnerComponent} from '../../../../components/prograss-spinner/prograss-spinner.component';
import {
  PendingOnlineMedicalRequestsComponent
} from '../../modules/admin/components/online-vet-care/inner-items/pending-online-medical-requests/pending-online-medical-requests.component';

interface Program {
  name: string;
}

@Component({
  selector: 'app-dashboard-default',
  imports: [FormsModule,
    // Select,
    // StatCardsComponent,
    ResultChartComponent,
    // OverviewTableComponent,
    NgIf, ReactiveFormsModule, IconField, AutoComplete, TrainerCardsComponent, AdminCardsComponent, RevanueChartComponent,
    // UnseenMailsComponent,
    PrograssSpinnerComponent, PendingOnlineMedicalRequestsComponent],
  templateUrl: './dashboard-default.component.html',
  styleUrl: './dashboard-default.component.scss',
  standalone: true
})
export class DashboardDefaultComponent implements OnInit {
  programs: Program[] = [];
  user: any;
  selectedCourseId = '';
  trainerId = '';
  isTrainer = false;
  isAdmin = true;
  coursePlaceholder = 'Select Course'
  allCourses: any;
  filteredCourses: any;
  firstCourseName: any;
  selectedIntakeId = '';
  dashboardData:any;
  loading = false;


  form: FormGroup = new FormGroup({
    text: new FormControl()
  });

  selectedProgram: Program = {name: 'Current'};

  constructor(
    private tokenService: TokenService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dashboardService: DashboardService
  ) {
    this.user = tokenService.getUserData();

    this.isTrainer = tokenService.isTrainer();
    this.isAdmin = tokenService.isAdmin();

    if (this.isTrainer) {
      this.getInstructorId();
    }
    else{
      this.getAdminDashboardDta();
    }

    // Initialize the form with a selectedCourse control
    this.form = this.fb.group({
      selectedCourse: [''] // Initialize with an empty string or a default value
    });

    // Subscribe to value changes of selectedCourse form control
    this.form.get('selectedCourse')?.valueChanges.subscribe((value) => {
      if (!value) {
        this.selectedCourseId = '';  // Reset the selectedCourseId when cleared
        // console.log('Course selection cleared');
        // this.getCourses(this.studentId);
      }
    });
  }

  getInstructorId() {
    // this.loading = true;
    // if (this.user?.userId) {
    //   this.instructorService.getInstructorByUserId(this.user?.userId)
    //     .subscribe({
    //       next: (response) => {
    //         // console.log('dd res', response);
    //         this.trainerId = response?.data?.propertyId;
    //         this.getCourses(this.trainerId);
    //         this.getTrainerDashboardDta();
    //       },
    //       error: (error) => {
    //         this.loading = false;
    //         console.error(error);
    //         this.messageService.add({severity: 'warn', summary: 'Error', detail: error?.error?.message});
    //       },
    //     });
    // }
  }

  getCourses(trainerId: string) {
    this.dashboardService.getInstructorAssignedCourses(trainerId).subscribe({
      next: (response) => {
        this.allCourses = response?.data || [];
        // console.log('all courses', this.allCourses);
        this.filteredCourses = this.allCourses;
        this.firstCourseName = this.allCourses[0]?.courseName;
      },
      error: (error) => {
        console.error('error', error);
        this.messageService.add({severity: 'warn', summary: 'Warn', detail: error?.error?.message});
      }
    });
  }

  filterCourses(event: any) {
    const query = event.query.toLowerCase();
    this.filteredCourses = this.allCourses.filter(
      (course: { courseName: string }) =>
        course.courseName.toLowerCase().includes(query)
    );
  }

  onCourseSelect(event: any) {
    const selectedCourse = event;
    this.selectedIntakeId = selectedCourse?.value?.intakeId;
    this.getTrainerDashboardDta()
  }

  resetCourse() {
    this.form.get('selectedCourse')?.setValue(null);
    this.selectedCourseId = '';
  }

  //get trainer dashboard data ----------------------

  getTrainerDashboardDta(){
    // this.loading = true;
    // if(this.isTrainer){
    //   this.dashboardService.getInstructorDashboardDetails(this.trainerId,this.selectedIntakeId)
    //     .subscribe({
    //       next: (response) => {
    //         // console.log('dashBoard data',response);
    //         this.dashboardData = response?.data;
    //         this.loading = false;
    //         // this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message });
    //       },
    //       error: (error) => {
    //         this.loading = false;
    //         // this.loading = false;
    //         console.error('Update error:', error);
    //         this.messageService.add({ severity: 'warn', summary: 'Error', detail: error?.error?.message || 'Update failed' });
    //       },
    //     });
    // }
  }

  //get admin dashboard data -------------------------
  getAdminDashboardDta(){
    // this.loading = true;
    // if(this.isAdmin){
    //   this.dashboardService.getAdminDashboardDetails()
    //     .subscribe({
    //       next: (response) => {
    //         // console.log('dashBoard data',response);
    //         this.dashboardData = response?.data;
    //         this.loading = false;
    //         // this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message });
    //       },
    //       error: (error) => {
    //         this.loading = false;
    //         console.error('Update error:', error);
    //         this.messageService.add({ severity: 'warn', summary: 'Error', detail: error?.error?.message || 'Update failed' });
    //       },
    //     });
    // }
  }
  ngOnInit() {
  }

}
