import { DataServiceService } from 'src/app/services/data-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostModel } from 'src/app/postModels';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less']
})
export class PostListComponent implements OnInit, OnDestroy {
  private subscribtions: Subscription[] = [];

  public today: number = Date.now();
  public posts: PostModel[]|null = [];

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.subscribtions.push(this.dataService.currentPageSubject.subscribe(res => {
      if (res.currentPage && res.pageSize) {
        this.initPage(res.currentPage, res.pageSize)
      }
    }))
  }

  initPage(pageNumber: number, pageSize: number = 10) {
    if (pageNumber && pageSize) {
      this.posts = this.dataService.getPageData({ pageNumber, pageSize });
    }
  }

  onLike(post: PostModel): void {
    if (!post.isLiked) {
      post.isLiked = true;
      post.likesCount++;
      if (post.isDisliked) {
        post.isDisliked = false;
        post.dislikesCount--;
      }
    } else {
      post.isLiked = false;
      post.likesCount--;
    }
  }

  onDislike(post: PostModel): void {
    if (!post.isDisliked) {
      post.isDisliked = true;
      post.dislikesCount++;
      if (post.isLiked) {
        post.isLiked = false;
        post.likesCount--;
      }
    } else {
      post.isDisliked = false;
      post.dislikesCount--;
    }
  }

  ngOnDestroy() {
    for (let i = 0; i < this.subscribtions.length; i++) {
      this.subscribtions[i].unsubscribe();
    }
  }
}
