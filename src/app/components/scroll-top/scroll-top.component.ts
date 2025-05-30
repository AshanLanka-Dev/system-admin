import { Component, HostListener } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  imports: [
    NgIf
  ],
  templateUrl: './scroll-top.component.html',
  styleUrl: './scroll-top.component.scss',
  standalone:true
})
export class ScrollTopComponent {
  isVisible = true; // Controls button visibility

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
