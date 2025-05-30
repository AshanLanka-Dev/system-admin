import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import {inject, NgZone} from "@angular/core";
// import { SnackbarService } from '../services/snackbar.service';
import { catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { TokenService } from '../services/token.service';

export const httpManagerInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(TokenService);
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const ngZone = inject(NgZone);

  // Set default headers
  let modifiedReq = req.clone({
    headers: req.headers.set('App-Type', 'admin')
  });

  // Add Authorization header if token exists
  if (cookieService.isTokenExists()) {
    const token = cookieService.getToken();
    modifiedReq = modifiedReq.clone({
      headers: modifiedReq.headers.set('Authorization', token),
    });
  }

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const code = error?.error?.code;
      const message = error?.error?.message;

      if (code === 401) {
        if(tokenService.isTokenExists()){
          tokenService.logout();
          ngZone.run(() => {
            router.navigate(['/security/process/verification']);
          });
        }
        else{
          console.log("Invalid username or password!");
        }
      }
      if (code === 409) {
        console.log(message);
      }
      if (code === 500) {
        console.log('Something went wrong, please try again later!');
      }
      if (error?.status === 413) {
        console.log('The selected file was too large..');
      }

      return throwError(() => error);
    }),
  );
};
