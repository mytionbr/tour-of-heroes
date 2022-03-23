import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterceptorsService } from './interceptors.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    InterceptorsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorsService,
      multi: true
    },
  ]
})
export class InterceptorsModule { }
