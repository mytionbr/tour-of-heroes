import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowErrorsModule } from '../show-errors/show-errors.module';
import { LoadingModule } from '../loading/loading.module';
import { NewHeroComponent } from './new-hero.component';



@NgModule({
  declarations: [
    NewHeroComponent,
    HeroFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShowErrorsModule,
    LoadingModule
  ]
})
export class NewHeroModule { }
