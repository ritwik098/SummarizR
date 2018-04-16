import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = '/summarize/';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

	public uploader:FileUploader = new FileUploader({
		url: URL,
		authToken: localStorage.getItem('jwtToken')
	});
	fileName: string = "";

  constructor() { }

  ngOnInit() {
  }

  fileEvent(fileInput: Event){
    let file = (<HTMLInputElement>fileInput.target).files[0];
    this.fileName = file.name;
	}

}
