
import {Divider} from 'primeng/divider';
import {Image} from 'primeng/image';
import {Component, OnInit, model, signal} from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-view-medical-request',
  imports: [
    Divider,
    Image,
    GalleriaModule
  ],
  templateUrl: './view-medical-request.component.html',
  styleUrl: './view-medical-request.component.scss',
  standalone:true
})
export class ViewMedicalRequestComponent implements OnInit {

  isInPetProfile= false;

  images = signal([
    {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
      alt: 'Image 1',
      title: 'Title 1'
    },
    {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
      alt: 'Image 2',
      title: 'Title 2'
    },
    {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
      alt: 'Image 3',
      title: 'Title 3'
    },
    {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
      alt: 'Image 4',
      title: 'Title 4'
    }
  ]);

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];

  ngOnInit() {}
}
