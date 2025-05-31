import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MedicalQueContextComponent} from './components/medical-que-context/medical-que-context.component';
import {QueueHomeComponent} from './components/queue-home/queue-home.component';

const routes: Routes = [
  { path: '', redirectTo: '/medical-queue/process/home', pathMatch: 'full' },
  {
    path: 'process',
    component: MedicalQueContextComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // <-- relative path
      { path: 'home', component: QueueHomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalQueueRoutingModule { }
