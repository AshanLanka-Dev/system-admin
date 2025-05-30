import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, RouterOutlet} from '@angular/router';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import { Location } from '@angular/common';
import {Divider} from 'primeng/divider';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import {TabPanel, TabView} from 'primeng/tabview';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-pet-profile',
  imports: [
    Divider,
    CommonModule,
    TabsModule,
    RouterOutlet,
    TabPanel,
    TabView
  ],
  templateUrl: './pet-profile.component.html',
  styleUrl: './pet-profile.component.scss',
  standalone:true
})
export class PetProfileComponent implements OnInit {

  activeIndex: number = 0;
  petId: string = '';
  isOnline: boolean = false;
  activeTabIndex: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private location: Location
  ) {
  }

  ngOnInit(): void {

    const currentUrl = this.router.url;

    if (currentUrl.includes('/online-vet-care/')) {
      this.isOnline = true;
    } else if (currentUrl.includes('/vet-care/')) {
      this.isOnline = false;
    }

    this.route.paramMap.subscribe(params => {
      this.petId = params.get('petId') || '';
      console.log('PetId:', this.petId);

      if (!this.petId) {
        this.location.back();
        this.messageService.add({severity: 'warn', summary: 'Warn', detail: 'Please select a pet'});
      }
    });

    // ----
    // if( !this.tokenService.isAdmin()){
    //   this.router.navigate(['/security/process/verification']);
    // }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      if (currentUrl.includes('/vaccination-history')) {
        this.activeTabIndex = 3;
      } else if (currentUrl.includes('/medical-history')) {
        this.activeTabIndex = 2;
      } else if (currentUrl.includes('/new-vaccine')) {
        this.activeTabIndex = 1;
      } else {
        this.activeTabIndex = 0;
      }
    });
  }

  handleTabChange(event: any) {
    const petId = this.route.snapshot.paramMap.get('petId');
    const currentUrl = this.router.url;

    if (!petId) return;

    // Dynamically determine if it's online vet care or normal vet care
    const vetBase = currentUrl.includes('/online-vet-care/')
      ? 'online-vet-care'
      : 'vet-care';

    const basePath = ['/dashboard/process/admin', vetBase, 'pet-profile', petId];

    switch (event.index) {
      case 0:
        this.router.navigate([...basePath, 'new-medicine']);
        break;
      case 1:
        this.router.navigate([...basePath, 'new-vaccine']);
        break;
      case 2:
        this.router.navigate([...basePath, 'medical-history']);
        break;
      case 3:
        this.router.navigate([...basePath, 'vaccination-history']);
        break;
    }
  }
}
