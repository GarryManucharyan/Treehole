import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent{

  constructor(private router: Router) { }

  onNavigateToPostForm(): void {
    this.router.navigate(["add-post"])
  }

  onNavigateToHomePage(): void {
    this.router.navigate(["posts"])
  }
}
