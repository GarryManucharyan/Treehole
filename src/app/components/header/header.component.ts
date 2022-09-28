import { DataService } from 'src/app/services/data.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  onNavigateToPostForm(): void {
    this.router.navigate(["add-post"])
  }

  onNavigateToHomePage(): void {
    this.dataService.currentPageSubject.next({ currentPage: 1, pageSize: 10 });
    this.router.navigate([""]);
    this.dataService.homePageBtnSubject.next(true)
  }
}
