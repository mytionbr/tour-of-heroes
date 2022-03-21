import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-my-heroes',
  templateUrl: './my-heroes.component.html',
  styleUrls: ['./my-heroes.component.scss']
})
export class MyHeroesComponent implements OnInit {

  heroes: Hero[] = [];
  selectedHero?: Hero;
  loading: boolean = false;
  errors: string | string[] = '';

  constructor(private heroService: HeroService) { 
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void{
    this.loading = true
    this.heroService.getMyHeroes()
      .subscribe({
        next: heroes => {
          this.heroes = heroes
          this.loading = false;
        },
        error: (err) =>{
          this.loading = false
          this.errors = err.error.message
        }
      })
  }

  onDelete(event: any): void {
    this.loading = true;
    const { hero } = event
    this.heroService.deleteHero(hero.id).subscribe(
      ()=>{
        this.loading = false;
        this.getHeroes();
      });
  }

}
