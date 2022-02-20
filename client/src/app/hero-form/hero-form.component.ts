import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
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
    const name = this.hero.name.trim();
    if(!name){return;}
    this.handleAdd.emit(form.value);
    this.hero.name = "";
  }

}
