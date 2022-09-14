import { DataServiceService } from 'src/app/services/data-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})
export class PaginationComponent implements OnInit, OnDestroy {
  public currentPage: number = 1;
  public pageSize: number = 10;
  public total?: number;

  constructor(private dataService: DataServiceService) { }

  private subscribtions: Subscription[] = []

  ngOnInit(): void {

    this.subscribtions.push(this.dataService.getAllPosts().subscribe(response => {
      this.dataService.pageData.allPosts = response;
      this.dataService.spreadPostsByPages();
      this.total = this.dataService.pageData.postsBuffer.length * this.pageSize
    }))
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.dataService.spreadPostsByPages(pageSize);
    this.dataService.pageSizeSubject.next(pageSize);
    // this.onPageIndexChange(1);
  }

  onPageIndexChange(currentPage: number) {
    this.dataService.currentPageSubject.next(currentPage);
    this.currentPage = currentPage;
    console.log("current Page " + currentPage);
  }

  ngOnDestroy() {
    for (let i = 0; i < this.subscribtions.length; i++) {
      this.subscribtions[i].unsubscribe()
    }
  }
}
