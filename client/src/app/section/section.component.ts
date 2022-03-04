import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  @Input() title: string = '';
  @Input('popularHeroes') heroes: Hero[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
