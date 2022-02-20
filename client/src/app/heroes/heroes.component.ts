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
  selectedHero?: Hero;

  constructor(private heroService: HeroService, 
    private messageService: MessageService) { 
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }

  add(hero: Hero): void {
    console.log(hero)
    this.heroService.addHero(hero)
      .subscribe(hero => {
        this.heroes.push(hero)
      })
  }

  onDelete(event: any): void {
    const { hero } = event
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}
