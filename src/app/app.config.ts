import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter,withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import customPreset from '../app/custom-themes/default-theme';
import {httpManagerInterceptorInterceptor} from './interceptor/http-manager.Interceptor';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ),
    provideClientHydration( withEventReplay()),
    providePrimeNG({
      theme: {
        preset: customPreset,
        options: {
          darkModeSelector: '.my-app',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities'
          }
        }
      }

      // theme: { preset: customPreset }
    }),
    provideHttpClient(
      withInterceptors([httpManagerInterceptorInterceptor]),
      withFetch()),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideAnimations(),
    provideAnimationsAsync()
  ]
};


