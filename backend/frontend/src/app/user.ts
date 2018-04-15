import { Serializable } from './serializable';

export class User implements Serializable<User>{
	id: number;
  email: string;
  username: string;
  jwtToken: string;
  firstname: string;
  lastname: string;
  profilePicture: string;

  deserialize(input) {
  	this.id = input.id;
  	this.email = input.email;
    this.username = input.username;
  	this.jwtToken = input.jwtToken;
  	this.firstname = input.firstname;
  	this.lastname = input.lastname;
  	this.profilePicture = input.profilePicture;
  	return this;
  }

  serialize() {
      var obj = {
          id: this.id,
          email: this.email,
          username : this.username,
          jwtToken : this.jwtToken,
          firstname : this.firstname,
          lastname : this.lastname,
          profilePicture : this.profilePicture,
      }
      return obj;
  }
}
