import {Component, OnInit} from '@angular/core';
import {AdminHeaderComponent} from '../admin-header/admin-header.component';
import {BreakCrumbForLmsComponent} from '../../../../../../components/breakcrumb-for-lms/breakcrumb-for-lms.component';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {TabPanel, TabView} from 'primeng/tabview';
import {TokenService} from '../../../../../../services/token.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-animal-breeds-management',
  imports: [
    AdminHeaderComponent,
    BreakCrumbForLmsComponent,
    RouterOutlet,
    TabPanel,
    TabView
  ],
  templateUrl: './animal-breeds-management.component.html',
  styleUrl: './animal-breeds-management.component.scss',
  standalone:true
})
export class AnimalBreedsManagementComponent implements OnInit {
  activeTabIndex: number = 0;

  constructor(
    private tokenService:TokenService,
    private router:Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {

    // if( !this.tokenService.isAdmin()){
    //   this.router.navigate(['/security/process/verification']);
    // }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      if (currentUrl.includes('/all-breeds')) {
        this.activeTabIndex = 1;
      } else {
        this.activeTabIndex = 0;
      }
    });


  }
  handleTabChange(event: any) {
    // Navigate to the appropriate route based on the selected tab
    if (event.index === 0) {
      this.router.navigate(['/dashboard/process/admin/animal-type-management/list']);
    }
    else if (event.index === 1) {
      this.router.navigate(['/dashboard/process/admin/animal-type-management/all-breeds']);
    }
  }
}
