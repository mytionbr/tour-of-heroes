import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service'
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  loading: boolean = false;

  constructor(private heroService: HeroService) { 
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void{
    this.loading = true
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes
        this.loading = false;
      })
  }

}
