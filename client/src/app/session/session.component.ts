import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  @Input() title: string = '';
  @Input('popularHeroes') heroes: Hero[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
