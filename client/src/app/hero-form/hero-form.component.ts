import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  @Output() handleAdd = new EventEmitter();

  hero = {
    name: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this.hero.name
    if(!this.hero.name){return;}
    this.handleAdd.emit(form.value);
  }

}
