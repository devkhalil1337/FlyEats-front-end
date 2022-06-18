import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  selectedTab = "";

  constructor(private _activatedRoute: ActivatedRoute, private router: Router) {
    _activatedRoute.params.subscribe(params => {
      this.selectedTab = params['view-type'];
    });
   }

  ngOnInit(): void {
  }


  onSelectedTab(route:string){
    this.router.navigate(['user/'+route])
  }


}
