import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentModel, PostModel } from 'src/app/post-models';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {
  public postData!: PostModel | null;
  public today: number = Date.now();
  public ShowNewCommentForm = false;
  public mouseIn = false

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  public newCommentForm!: FormGroup;


  ngOnInit(): void {
    this.postData = this.getPostDataById(this.activeRoute.snapshot.paramMap.get("id"));

    this.newCommentForm = this.formBuilder.group({
      message: ['', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(1000),
      ]]
    })
  }

  getPostDataById(id: string | null): PostModel | null {
    let result: PostModel | null = null;
    if (id) {
      let data = this.dataService.localData.find(post => {
        return post.id === +id
      })
      if (data) return data
    }
    return result
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

  onNavigateToHomePage(): void {
    this.dataService.currentPageSubject.next({ currentPage: 1, pageSize: 10 });
    this.router.navigate([""]);
  }

  onMouseInOut() {
    this.mouseIn = !this.mouseIn
  }

  onSubmit(commentBody: string) {

    //TODO: remove previous comment text from textarea after submit

    console.log(commentBody);
    const newComment: CommentModel = {
      body: commentBody,
      likesCount: 0,
      dislikesCount: 0,
      email: "Some_email@bldux.com",
      id: this.postData?.comments.length || NaN,
      isLiked: false,
      isDisliked: false,
      postId: this.postData?.id || NaN
    };
    this.postData?.comments.unshift(newComment),
      this.ShowNewCommentForm = !this.ShowNewCommentForm
  }

}
