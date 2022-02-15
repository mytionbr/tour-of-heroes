import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {

  @Input() hero: Hero = {
    id: 0,
    name: ""
  }

  @Output('delete') deleteFunction = new EventEmitter();

  constructor() {}


  ngOnInit(): void {
  }

  delete(): void  {
    this.deleteFunction.emit({hero: this.hero})
  }
}
