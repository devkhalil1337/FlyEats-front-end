import { Component, OnInit } from '@angular/core';
import { gallryImages } from 'src/app/mock-api/gallery-data';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {


  galleryList:String[]
  constructor() { 
    this.galleryList = gallryImages
  }

  ngOnInit(): void {
  }

}
