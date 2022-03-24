import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-thumbnails',
  templateUrl: './hero-thumbnails.component.html',
  styleUrls: ['./hero-thumbnails.component.scss']
})
export class HeroThumbnailsComponent implements OnInit {

  @Input() hero: Hero = {
    name: '',
    about: '',
    agency: '',
    category: '',
  }; 

  constructor() { }

  ngOnInit(): void {
  }

}
