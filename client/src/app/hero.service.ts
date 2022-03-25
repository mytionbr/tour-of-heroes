import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private baseUrl = environment.api_url + '/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}


  getHeroes(category = 'all'): Observable<Hero[]> {
    let url = this.baseUrl
    
    if(category !== 'all' ){
      url += `?category=${category}`
    }
    console.log(url)
    return this.http.get<Hero[]>(url).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getMyHeroes(): Observable<Hero[]>{
    const userInfo = this.tokenService.getUserInfo();

    if (!userInfo) {
      return throwError(() => new Error('Usuário não logado'))
    }

    const userId = userInfo.id;
    const url = `${this.baseUrl}/user/${userId}`;
    return this.http.get<Hero[]>(url);
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/${hero.id}`, hero);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.baseUrl, hero)
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<Hero>(url);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.baseUrl}/name/${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  getCategories(): Observable<string[]>{
    const url = `${this.baseUrl}/categories`;
    return this.http.get<string[]>(url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
