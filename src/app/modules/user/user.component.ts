import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  selectedTab = "";

  constructor() {

    this.selectedTab = 'My Orders';

   }

  ngOnInit(): void {
  }

}
