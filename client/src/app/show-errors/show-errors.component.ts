import { Component, Input, OnInit } from '@angular/core';
import { isArray as isArrayFunction } from '../../util/isArray';

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.scss']
})
export class ShowErrorsComponent implements OnInit {

  @Input() errors: string[] | string = '';

  constructor() { }

  ngOnInit(): void {
    console.log(this.errors)
  }

  isArray(element: any){
    return isArrayFunction(element);
  }

}
