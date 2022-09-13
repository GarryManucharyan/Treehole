import { DataServiceService } from 'src/app/services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})
export class PaginationComponent implements OnInit {
  public currentPage: number = 1;
  public pageSize: number = 10;
  public total?: number;

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getAllPosts().subscribe(response => {
      this.dataService.pageData.allPosts = response;
      this.dataService.spreadPostsByPages();
      this.total = this.dataService.pageData.postsBuffer.length * this.pageSize
    })
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
}
