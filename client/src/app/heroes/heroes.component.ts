import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
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

  constructor(private heroService: HeroService, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getCategory(): string {
    const param = this.route.snapshot.paramMap.get('category');
    let category 
    
    if(!param) {
      category = 'all' 
    } else {
      category = param
    }

    return category;
  }

  getHeroes(): void{
    const category = this.getCategory()
    this.loading = true
    this.heroService.getHeroes(category)
      .subscribe(heroes => {
        this.heroes = heroes
        this.loading = false;
      })
  }

}
