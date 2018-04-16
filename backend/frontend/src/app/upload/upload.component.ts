import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = '/upload/';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

	public uploader:FileUploader = new FileUploader({url: URL});

  constructor() { }

  ngOnInit() {
  }

}
