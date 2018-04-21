import { Serializable } from './serializable';

export class User implements Serializable<User>{
	id: number;
  email: string;
  username: string;
  jwtToken: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  pastNotes: any[];

  deserialize(input) {
  	this.id = input.id;
  	this.email = input.email;
    this.username = input.username;
  	this.jwtToken = input.jwtToken;
  	this.firstname = input.firstname;
  	this.lastname = input.lastname;
  	this.profilePicture = input.profilePicture;
    this.pastNotes = input.pastNotes;
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
          pastNotes: this.pastNotes
      }
      return obj;
  }
}
