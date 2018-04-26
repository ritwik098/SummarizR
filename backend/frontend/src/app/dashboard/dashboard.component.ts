import { Component, OnInit } from '@angular/core';
import { User } from '../user';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	user: User;
	onUpload: boolean = true;
	uploading: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  	this.user = this.authService.loadUserFromLocalStorage();
  }

  onUploading(uploading: boolean) {
    this.uploading = uploading;
  }

}
