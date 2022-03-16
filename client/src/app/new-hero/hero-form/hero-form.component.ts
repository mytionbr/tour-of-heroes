import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {

  heroForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  errors: string | string[] = '';

  constructor(private formBuilder: FormBuilder, private heroService: HeroService) {
    this.heroForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      about: [''],
      agency: [''],
      category: ['']
    })
   }

   verifyValidRequired(property: string) {
    return (this.heroFormControl[property].touched || this.submitted) && this.heroFormControl[property].errors?.['required']
  }

  ngOnInit(): void {
  }


  get heroFormControl(){
    return this.heroForm.controls
  }

  onSubmit(){
    this.submitted = true;
    if (this.heroForm.valid){
      this.loading = true;

      const hero: Hero = {
        name: this.heroFormControl["name"].value,
        about: this.heroFormControl["about"].value,
        category: this.heroFormControl["category"].value,
        agency: this.heroFormControl["agency"].value
      }

      this.heroService.addHero(hero)
        .subscribe({
          next: ()=> {
            this.loading = false;
            this.submitted = false;

          },
          error: (errors)=> {
            this.loading = false;
            this.submitted = false;

            this.errors = errors.message;
          }
        })
    
    }
  }

}
