import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavLinkComponent } from './nav-link/nav-link.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TitleComponent } from './title/title.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    NavbarComponent,
    NavLinkComponent,
    TitleComponent,
    HeroCardComponent,
    DashboardCardComponent,
    HeroFormComponent,
    FooterComponent,
    SidebarComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
