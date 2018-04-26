import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FileUploader,  FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { AuthService } from '../auth.service'

const URL = '/summarizer/';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Output() onUploading = new EventEmitter<boolean>();
	public uploader: FileUploader;
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  title: string = "";
	fileName: string = "";
	fullText: string = "";
	summaries: any[];
	videoLoaded: boolean = false;
	videoURL: string = "";
	thumbnailURL: string = "";
  uploading: boolean = false;
  invalid: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  	this.uploader = new FileUploader({
			url: URL,
			authToken: 'Bearer ' + localStorage.getItem('jwtToken')
		});
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('title', this.title);
    };
  	this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onBeforeUploadItem = (item:any) => {
        console.log("onBeforeUploadItem:", item);
        this.onUploading.emit(true);
        this.uploading = true;
        this.invalid = false;
        
    };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        console.log("ImageUpload:uploaded:", item, status);
        this.onUploading.emit(false);
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
    this.title = res.title;
    this.authService.loadUserFromDatabase().subscribe(
        result => {
          console.log("user: ",result);
          localStorage.setItem('currentUser', JSON.stringify(result));
        }, error => {
          console.log(error);
        }
      )
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log("ERROR");
  	console.log(response);
  }

  fileEvent(fileInput: Event){
    let file = (<HTMLInputElement>fileInput.target).files[0];
    this.fileName = file.name;
    if(file.size > 40000000){
      this.invalid = true;
      this.uploader.queue[0].remove();
    } else {
      this.invalid = false;
    }
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

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
    let file = this.uploader.queue[0].file;
    this.fileName = file.name;
    if(file.size > 40000000){
      this.invalid = true;
      this.uploader.queue[0].remove();
    } else {
      this.invalid = false;
    }
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
