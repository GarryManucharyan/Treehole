import { DataServiceService } from 'src/app/services/data-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostModel, CommentModel } from 'src/app/postModels';
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
    private dataService: DataServiceService,
    private router: Router
  ) { }

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

  onLike(post: PostModel | CommentModel): void {
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

  onDislike(post: PostModel | CommentModel): void {
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

  onGetCommentsByPostId(post: PostModel, postId: number): void {
    if (!post.isCommentsGot) {
      this.dataService.getCommentsByPostId(postId).subscribe(comments => {
        for (let comment of comments) {
          comment.likesCount = Math.floor(Math.random() * 10);
          comment.dislikesCount = Math.floor(Math.random() * 3);
          comment.isLiked = false;
          comment.isDisliked = false;
          comment.body = comment.body.split("\n").join(" ")
        }
        post.comments = comments;
        post.isCommentsGot = true;
        this.router.navigate(["/posts", post.id])
      }) 
    } else  this.router.navigate(["/posts", post.id])
  }

  ngOnDestroy() {
    for (let i = 0; i < this.subscribtions.length; i++) {
      this.subscribtions[i].unsubscribe();
    }
  }
}
