import { Component, OnInit } from '@angular/core';
import { FileUploader,  FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

const URL = '/summarizer/';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

	public uploader: FileUploader;
	fileName: string = "";
	fullText: string = "";

  constructor() { }

  ngOnInit() {
  	this.uploader = new FileUploader({
			url: URL,
			authToken: 'Bearer ' + localStorage.getItem('jwtToken')
		});

  	this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log(response);
    let res = JSON.parse(response);
    this.fullText = res.text;
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
  	console.log(response);
  }

  fileEvent(fileInput: Event){
    let file = (<HTMLInputElement>fileInput.target).files[0];
    this.fileName = file.name;
	}

}
