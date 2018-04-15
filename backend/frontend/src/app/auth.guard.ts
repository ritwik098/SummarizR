import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let token = localStorage.getItem('jwtToken');
	  if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
  	} else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('jwtToken');

    	// not logged in so redirect to login page with the return url
    	this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
    	return false;
    }
  }
}
