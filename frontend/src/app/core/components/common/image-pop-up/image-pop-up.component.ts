import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-pop-up',
  templateUrl: './image-pop-up.component.html',
  styleUrls: ['./image-pop-up.component.scss']
})
export class ImagePopUpComponent implements OnInit {
@Input() imageUrl!: SafeUrl;
constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}) { }

  ngOnInit() {
    // console.log('Received imageUrl:', this.data);
  }
  

}
