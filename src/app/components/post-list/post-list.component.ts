import { PostModel, CommentModel } from 'src/app/post-models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less']
})
export class PostListComponent implements OnInit, OnDestroy {
  private subscribtions: Subscription[] = [];

  public today: number = Date.now();
  public posts: PostModel[] | null = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscribtions.push(this.dataService.currentPageSubject.subscribe(res => {
        this.initPage(res.currentPage, res.pageSize)
    }))
  }

  initPage(currentPage: number, pageSize: number) {
    this.posts = this.dataService.getPageData({ currentPage, pageSize });
  }

  onLike(post: PostModel | CommentModel, action: "like" | "dislike"): void {
    this.dataService.react(post, action)
  }

  navigateToPostPage(id: number) {
    this.router.navigate(["/posts", id])
  }

  ngOnDestroy() {
    for (let i = 0; i < this.subscribtions.length; i++) {
      this.subscribtions[i].unsubscribe();
    }
  }
}
