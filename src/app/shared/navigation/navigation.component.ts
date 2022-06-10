import { Component, Input, OnInit } from '@angular/core';
import { Business } from 'src/app/modals/business.modal';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input("businessData") businessInput: Business


  constructor() { }

  ngOnInit(): void {
  }

}
