import { DataServiceService } from './services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getAllPosts().subscribe(res => {
      this.dataService.localData = res;
      this.dataService.currentPageSubject.next({currentPage:1, pageSize:10})
    })
  }
}
