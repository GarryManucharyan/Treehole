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
    this.subscribtions.push(this.dataService.currentPageSubject.subscribe(() => {
      this.total = this.dataService.localData.length;
    }))
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.dataService.currentPageSubject.next({ currentPage: this.currentPage, pageSize: pageSize });
  }

  onPageIndexChange(currentPage: number): void {
    this.currentPage = currentPage;
    this.dataService.currentPageSubject.next({ currentPage: currentPage, pageSize: this.pageSize });
  }

  ngOnDestroy(): void {
    for (let i = 0; i < this.subscribtions.length; i++) {
      this.subscribtions[i].unsubscribe();
    }
  }
}
