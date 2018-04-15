import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../user';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService,
  	private router: Router) { }

  ngOnInit() {
  	this.user = this.authService.loadUserFromLocalStorage();
  }

  logout() {
		this.authService.logout();
		this.user = null;
		this
	}
}
