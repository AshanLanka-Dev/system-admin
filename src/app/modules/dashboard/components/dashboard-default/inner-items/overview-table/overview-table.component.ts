import {Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressBar } from 'primeng/progressbar';
import { Dialog } from 'primeng/dialog';

interface Column {
  field: string;
  header: string;
}

interface Course {
  course: string;
  studentName:string;
  progress: string;
  lecture: string;
  lectureAvatar:string;
  assignments: string;
  studentInfo: string;
}


@Component({
  selector: 'app-overview-table',
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    ProgressBar,
    Dialog
  ],
  templateUrl: './overview-table.component.html',
  styleUrl: './overview-table.component.scss',
  standalone:true
})
export class OverviewTableComponent implements OnInit {
  items: MenuItem[] = [];
  courses: Course[] = [];
  cols: Column[] = [];
  selectedRowData:any;
  visible: boolean = false;


  showDialog() {
    this.visible = true;
  }

  ngOnInit() {
    this.items = [
      { label: 'My Courses' },
      { label: 'Purchase' },
    ];

    this.cols = [
      { field: 'course', header: 'Course' },
      { field: 'studentName', header: 'Student Name' },
      { field: 'progress', header: 'Progress' },
      { field: 'lecture', header: 'Lecture' },
      { field: 'assignments', header: 'Assignments' },
      { field: 'studentInfo', header: 'Student Info' },
    ];

    this.courses = [
      {
        course: 'N5 Program',
        studentName: 'Ashen Manilka ',
        progress: '0',
        lecture: 'Hasika',
        lectureAvatar:'https://s3-alpha-sig.figma.com/img/3549/2060/43c73910285476d179be5bb225554b88?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ObKup61b5tYTl9BQjxr8jXML635ejkTgGbZp0dGCre9aFLX5s126KhGepsAyZLEXGP2fTiSGDmqhDJFlANr1LDAy-WS1bgtOQcHrsy-Y6l5sdppO2vKiQKZ3ZJzfpPAUiygELHo6ldzzVe~zNzgbdfUFBnWASLI6gF1DaxiJD~h0ITtsHcAsowH0UNXX8Wqz1CUJlffaZFFJ7n5cIX5IG~oCujwAMD63uRLkm4aQQ6WYp7DXqR1xSlCGCvpQGeSXaDOE4YfTY6bodvh~BSNvptt5~rRBb7gJh3ZzdBPCVGh1nc2xJXFolGYdnjgBvcO9z0Dbie2vKYSDFk7ucELBQQ__',
        assignments: '12',
        studentInfo: '',
      },
      // {
      //   course: 'N4 Program',
      //   duration: '300 Hours ',
      //   progress: '0',
      //   lecture: 'Hasika',
      //   lectureAvatar:'https://s3-alpha-sig.figma.com/img/5c8d/150c/e856746481aa4d4fc33c3736b561abf2?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=BQKU9q4mMMgkOJ25cIvSt5GLPkAhD2TavKqBGNf1Xgbl7aVFncjWM4xKxxcBboQssCEVIFS6N93vzI6QdHAUS38J~OJVXOq-i8dlhKjhRXxXBXwYrEv8kCKq4W0l6ODd760fpY82EVqGa59oU4jB6v07DdNAOpehbqntWxbYPeg9V6ATuQMfovey-y2R~-K-Shc7q-KHXvCqOEuznOmpd6AkSbvoLnUwpjKlHWq9P4ZSxJ8~kQ6YSUzGRfva2ui3WetwsVSBlSG59nD1vBZIG9FE6J3t9mpjslZJBUoX2YXPyFU7jryzjVGL20vfqONjXOgTwdbLaApyzRj3KFuN7w__',
      //   assignments: '12',
      //   action: 'Pending',
      // },

    ];
  }

  onRowClick(rowData: any): void {
    this.visible = true;
    // console.log(rowData);
    this.selectedRowData = rowData;
  }

}

