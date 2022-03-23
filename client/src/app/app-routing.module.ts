import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { NewHeroModule } from './new-hero/new-hero.module';
import { NewHeroComponent } from './new-hero/new-hero.component';
import { MyHeroesComponent } from './my-heroes/my-heroes.component';

const routes: Routes = [
  { path: 'heroes', component: MyHeroesComponent, canActivate: [AuthGuard]},
  { path: 'heroes/my', component: MyHeroesComponent, canActivate: [AuthGuard]},
  { path: 'heroes/new', component: NewHeroComponent, canActivate: [AuthGuard]},
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }
