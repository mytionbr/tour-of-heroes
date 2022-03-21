import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero?: Hero;
  editable?: boolean = false;
  heroForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  isAuth: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { 
    this.heroForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      about: [''],
      agency: [''],
      category: [''],
    })
  }

  ngOnInit(): void {
    this.getHero()
    this.isAuth = this.authService.isAuthenticated();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe({
        next: hero => this.hero = hero,
        complete: ()=> this.initFields()
      })
      
  }

  initFields(): void {
    console.log(this.hero)
    this.heroFormControl['name'].setValue(this.hero?.name || '')
    this.heroFormControl['category'].setValue(this.hero?.category || '')
    this.heroFormControl['about'].setValue(this.hero?.about || '')
    this.heroFormControl['agency'].setValue(this.hero?.agency || '')
  }

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero): void {
      this.heroService.updateHero(hero)
        .subscribe(() => this.goBack());
  }

  onEdit(): void {
    this.editable = true;
  }

  onCancel(): void {
    this.editable = false;
  }

  get heroFormControl() {
    return this.heroForm.controls;
  }

  verifyValidRequired(property: string) {
    return (this.heroFormControl[property].touched || this.submitted) && this.heroFormControl[property].errors?.['required']
  }


  onSubmit(): void {
    this.submitted = true;
    console.log('oopp')
    if(this.heroForm.valid){
      this.loading = true;

      this.hero = {
        ...this.hero,
        name: this.heroFormControl['name'].value,
        agency: this.heroFormControl['agency'].value,
        category: this.heroFormControl['category'].value,
        about: this.heroFormControl['about'].value
      }

      this.save(this.hero);
    }
  }


}
