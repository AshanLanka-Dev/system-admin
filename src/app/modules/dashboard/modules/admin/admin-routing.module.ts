import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserManagementComponent} from './components/user-management/user-management.component';
import {UserRolesComponent} from './components/user-management/inner-items/user-roles/user-roles.component';
import {SystemUsersComponent} from './components/user-management/inner-items/system-users/system-users.component';
import {ReceptionistsComponent} from './components/user-management/inner-items/receptionists/receptionists.component';
import {ClientManagementComponent} from './components/client-management/client-management.component';
import {AllClientsComponent} from './components/client-management/inner-items/all-clients/all-clients.component';
import {ManagePetsComponent} from './components/client-management/inner-items/manage-pets/manage-pets.component';
import {PetProfileComponent} from './components/pet-profile/pet-profile.component';
import {OnlineVetCareComponent} from './components/online-vet-care/online-vet-care.component';
import {PendingOnlineMedicalRequestsComponent} from './components/online-vet-care/inner-items/pending-online-medical-requests/pending-online-medical-requests.component';
import {AllOnlineMedicalRequestsComponent} from './components/online-vet-care/inner-items/all-online-medical-requests/all-online-medical-requests.component';
import {VetCareComponent} from './components/vet-care/vet-care.component';
import {MedicalQueListComponent} from './components/vet-care/inner-items/medical-que-list/medical-que-list.component';
import {NewMedicinesComponent} from './components/pet-profile/inner-items/new-medicines/new-medicines.component';
import {NewVaccinesComponent} from './components/pet-profile/inner-items/new-vaccines/new-vaccines.component';
import {VaccinationHistoryComponent} from './components/pet-profile/inner-items/vaccination-history/vaccination-history.component';
import {MedicalHistoryComponent} from './components/pet-profile/inner-items/medical-history/medical-history.component';
import {PetQueHistoryComponent} from './components/vet-care/inner-items/pet-que-history/pet-que-history.component';
import {AnimalBreedsManagementComponent} from './components/animal-breeds-management/animal-breeds-management.component';
import {AllAnimalTypesComponent} from './components/animal-breeds-management/inner-items/all-animal-types/all-animal-types.component';
import {AllBreedsComponent} from './components/animal-breeds-management/inner-items/all-breeds/all-breeds.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard/process/admin/user-management', pathMatch: 'full'},
  {path: 'user-management', component: UserManagementComponent,
    children: [
      { path: '', redirectTo: 'roles', pathMatch: 'full' },
      { path: 'roles', component: UserRolesComponent },
      { path: 'system-users', component: SystemUsersComponent },
      { path: 'receptionists', component: ReceptionistsComponent },
    ]
  },
  {path: 'client-management', component: ClientManagementComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: AllClientsComponent },
      { path: 'pets', component: ManagePetsComponent },
      { path: 'pets/:ownerName', component: ManagePetsComponent },
    ]
  },
  {path: 'online-vet-care', component: OnlineVetCareComponent,
    children: [
      { path: '', redirectTo: 'request-list', pathMatch: 'full' },
      { path: 'request-list', component: AllOnlineMedicalRequestsComponent },
      { path: 'pending-request-list', component: PendingOnlineMedicalRequestsComponent },
      { path: 'pet-profile/:petId', component: PetProfileComponent , children:[
          { path: '', redirectTo: 'new-medicine', pathMatch: 'full' },
          { path: 'new-medicine', component: NewMedicinesComponent },
          { path: 'new-vaccine', component: NewVaccinesComponent },
          { path: 'medical-history', component: MedicalHistoryComponent },
          { path: 'vaccination-history', component: VaccinationHistoryComponent },
        ] },
      { path: 'pet-profile', component: PetProfileComponent },
    ]
  },
  {path: 'vet-care', component: VetCareComponent,
    children: [
      { path: '', redirectTo: 'que-list', pathMatch: 'full' },
      { path: 'que-list', component: MedicalQueListComponent },
      { path: 'que-history', component: PetQueHistoryComponent },
      { path: 'pet-profile/:petId', component: PetProfileComponent , children:[
          { path: '', redirectTo: 'new-medicine', pathMatch: 'full' },
          { path: 'new-medicine', component: NewMedicinesComponent },
          { path: 'new-vaccine', component: NewVaccinesComponent },
          { path: 'medical-history', component: MedicalHistoryComponent },
          { path: 'vaccination-history', component: VaccinationHistoryComponent },
        ] },
      { path: 'pet-profile', component: PetProfileComponent  },
    ]
  },
  {path: 'animal-type-management', component: AnimalBreedsManagementComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: AllAnimalTypesComponent },
      { path: 'all-breeds', component: AllBreedsComponent },
      { path: 'all-breeds/:animalType', component: AllBreedsComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
