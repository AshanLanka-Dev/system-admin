import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Carousel, CarouselModule} from 'primeng/carousel';
import {NgIf} from '@angular/common';

interface Content {
  id: string
  title: string
  content: string
}

@Component({
  selector: 'app-carosel-security',
  imports: [
    CarouselModule,
  ],
  templateUrl: './carosel-security.component.html',
  styleUrl: './carosel-security.component.scss',
  standalone:true
})
export class CaroselSecurityComponent    {


  content: Content[] = [
    // {
    //   id: '1',
    //   title: 'Master JLPT N5–N1 with Expert Guidance.',
    //   content: 'Unlock your full potential in Japanese with a structured, expert-led learning experience. ' +
    //     'Our platform offers in-depth lessons, real JLPT exam simulations, interactive exercises, and personalized ' +
    //     'progress tracking. Master reading, listening, grammar, vocabulary, and kanji with a results-driven approach. ' +
    //     'Whether you\'re starting at N5 or aiming for N1, we provide the tools and guidance you need to succeed. Join ' +
    //     'thousands of learners and take the next step toward Japanese fluency today!'
    // },
    // {
    //   id: '2',
    //   title: 'Master JLPT N5–N1 with Expert Guidance.',
    //   content: 'Unlock your full potential in Japanese with a structured, expert-led learning experience. ' +
    //     'Our platform offers in-depth lessons, real JLPT exam simulations, interactive exercises, and personalized ' +
    //     'progress tracking. Master reading, listening, grammar, vocabulary, and kanji with a results-driven approach. ' +
    //     'Whether you\'re starting at N5 or aiming for N1, we provide the tools and guidance you need to succeed. Join ' +
    //     'thousands of learners and take the next step toward Japanese fluency today!'
    // },
    // {
    //   id: '3',
    //   title: 'Master JLPT N5–N1 with Expert Guidance.',
    //   content: 'Unlock your full potential in Japanese with a structured, expert-led learning experience. ' +
    //     'Our platform offers in-depth lessons, real JLPT exam simulations, interactive exercises, and personalized ' +
    //     'progress tracking. Master reading, listening, grammar, vocabulary, and kanji with a results-driven approach. ' +
    //     'Whether you\'re starting at N5 or aiming for N1, we provide the tools and guidance you need to succeed. Join ' +
    //     'thousands of learners and take the next step toward Japanese fluency today!'
    // },
  ]

  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number }[] = [
    {
      breakpoint: '1400px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ]

}
