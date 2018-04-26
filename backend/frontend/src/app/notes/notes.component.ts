import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service'

import { User } from '../user';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

	user: User;
	notes = new Map<string, any>();
	currentNote: any = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loadUserFromDatabase().subscribe(
      result => {
        console.log("user: ",result);
        localStorage.setItem('currentUser', JSON.stringify(result));
        this.user = result;
      }, error => {
        console.log(error);
      }
    );
  	for(let note of this.user.pastNotes){
  		this.notes.set(note.title, note);
  	}
  	console.log(this.notes);
  }

  getKeys(map){
    return Array.from(map.keys());
  }

  getValues(map){
    return Array.from(map.values());
  }

  selectNote(title: string){
  	this.currentNote = this.notes.get(title);
  	console.log(this.currentNote);
  }

  jumpTo(time: number){
		var video = <HTMLVideoElement>document.getElementById("mainVideoPast");
		video.currentTime = time;
	}

  getTime(time: number){
		let number = Math.round(time);
		let minutes = Math.floor(number / 60);
		let seconds = number % 60;

		return "" + minutes + ":" + seconds;
	}

}
