import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CommentModel, PostModel } from 'src/app/post-models';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {
  public showNewCommentForm: boolean = false;
  public postData!: PostModel | null;
  public today: number = Date.now();
  public confirmModal?: NzModalRef;
  public mouseIn: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private modal: NzModalService,
    private router: Router,
  ) { }

  public newCommentForm!: FormGroup;


  ngOnInit(): void {
    this.postData = this.getPostDataById(Number( this.activeRoute.snapshot.paramMap.get("id")));

    this.newCommentForm = this.formBuilder.group({
      message: ['', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(1000),
      ]]
    })
  }

  getPostDataById(id: number | null): PostModel | null {
    return this.dataService.getPostById(id)
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

  onSubmit(commentBody: string, post: PostModel | null) {
    console.log(commentBody);
    this.dataService.addCommentToPost(commentBody, post)
    this.newCommentForm.reset()
  }

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Cancel Editing',
      nzContent: 'You got unsaved changes. Are you sure you want to cancel editing?',
      nzOnCancel: () => {
        this.newCommentForm.reset();
        this.showNewCommentForm = false
      },
      nzOkText: "No, continue editing.",
      nzCancelText: "Yes, don't save."
    });
  }

}
