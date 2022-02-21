import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-link',
  templateUrl: './sidebar-link.component.html',
  styleUrls: ['./sidebar-link.component.scss']
})
export class SidebarLinkComponent implements OnInit {

  @Input() icon: string = ''
  @Input() href: string = ''
  @Input() name: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
