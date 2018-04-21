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
	summaries: any[];
	videoLoaded: boolean = false;
	videoURL: string = "";
	thumbnailURL: string = "";
  uploading: boolean = false;

  constructor() { }

  ngOnInit() {
  	this.uploader = new FileUploader({
			url: URL,
			authToken: 'Bearer ' + localStorage.getItem('jwtToken')
		});

  	this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onBeforeUploadItem = (item:any) => {
        console.log("onBeforeUploadItem:", item);
        this.uploading = true;
    };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        console.log("ImageUpload:uploaded:", item, status);
        this.uploading = false;
    };
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log(response);
    let res = JSON.parse(response);
    this.fullText = res.text;
    this.summaries = res.sentences;
    this.videoLoaded = true;
    this.videoURL = res.content_url;
    this.thumbnailURL = res.thumbnail_url;
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log("ERROR");
  	console.log(response);
  }

  fileEvent(fileInput: Event){
    let file = (<HTMLInputElement>fileInput.target).files[0];
    this.fileName = file.name;
	}

	jumpTo(time: number){
		var video = <HTMLVideoElement>document.getElementById("mainVideo");
		video.currentTime = time;
	}

	getTime(time: number){
		let number = Math.round(time);
		let minutes = Math.floor(number / 60);
		let seconds = number % 60;

		return "" + minutes + ":" + seconds;
	}

}
