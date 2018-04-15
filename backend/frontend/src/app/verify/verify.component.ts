import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

import { JwtHelper } from 'angular2-jwt';

import { User } from '../user';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  jwtHelper: JwtHelper = new JwtHelper();
  jwtToken: string;

	constructor(
		private route: ActivatedRoute,
    	private router: Router,
    	private authService: AuthService) { }

	ngOnInit() {
    this.jwtToken = this.route.snapshot.queryParams['token'];
		if(!this.authService.loadUserFromLocalStorage() && this.jwtToken){
			  console.log('jwtToken', this.jwtToken);

	 		let user = new User();
	 		user.deserialize(this.jwtHelper.decodeToken(this.jwtToken));
	 		console.log('user', user);

	 		if(user){
        this.authService.saveJwt(this.jwtToken);
	 			this.router.navigate(['/dashboard']);
	 		} else {
	 			console.log('user', user);
	 			this.router.navigate(['/', {error:'invalidToken'}]);
	 		}
		} else {
			this.router.navigate(['/dashboard']);
		}
	}

}
