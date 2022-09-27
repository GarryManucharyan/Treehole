import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  onNavigateToPostForm(): void {
    this.router.navigate(["add-post"])
  }

  onNavigateToHomePage(): void {
    this.dataService.currentPageSubject.next({ currentPage: 1, pageSize: 10 });
    this.router.navigate([""]);
    this.dataService.homePageBtnSubject.next(true)
  }

}
