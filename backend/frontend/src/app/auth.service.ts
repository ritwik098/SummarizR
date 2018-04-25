import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'

import { Router } from '@angular/router';
import { User } from './user'

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private router: Router,
    private http: Http) { }

  saveJwt(jwtToken: string){
      localStorage.setItem('currentUser', JSON.stringify(this.jwtHelper.decodeToken(jwtToken)));
      localStorage.setItem('jwtToken', jwtToken);
  }

  generateJwt() {
      // create authorization header with jwt token
      // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken) {
          let headers = new Headers({ 'Authorization': 'Bearer ' + jwtToken });
          return new RequestOptions({ headers: headers });
      } else {
          return null;
      }
  }

  loadUserFromLocalStorage() {
      let currentUser = new User();
      let jsonData = JSON.parse(localStorage.getItem("currentUser"));
      if(jsonData){
          let user = new User();
          user.deserialize(jsonData);
          return user;
      } else {
          return null;
      }
  }

  loadUserFromDatabase() {
    return this.http.get(environment.apiUrl+'/user/', this.generateJwt()).map((response: Response) => response.json()); 
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      localStorage.removeItem('jwtToken');
  }
}
