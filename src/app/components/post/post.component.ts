import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CommentModel, PostModel } from 'src/app/post-models';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {
  public showNewCommentForm: boolean = false;
  public today: number = Date.now();
  public confirmModal?: NzModalRef;
  public mouseIn: boolean = false;
  public postData!: PostModel;

  constructor(
    private activeRoute: ActivatedRoute,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private modal: NzModalService,
  ) { }

  public newCommentForm!: FormGroup;


  ngOnInit(): void {
    this.initPost(Number(this.activeRoute.snapshot.paramMap.get("id")))
    this.newCommentForm = this.formBuilder.group({
      message: ['', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(1000),
      ]]
    })
  }

  initPost(postId: number) {
    if (this.dataService.getPostByIdFromlocalData(postId)) {
      this.postData = this.dataService.getPostByIdFromlocalData(postId) as PostModel;
      this.initComments(this.postData.id);
    } else {
      this.dataService.getPostById(postId).pipe(mergeMap(post => {
        return this.dataService.getCommentsByPostId(postId).pipe(map(comments => {
          post.comments = comments;
          return post;
        }));
      })).subscribe(post => {
        this.postData = post
      });
    }
  }

  initComments(postId: number) {
    this.dataService.getCommentsByPostId(postId).subscribe(comments => {
      if (this.postData) {
        this.postData.comments = comments;
      }
    })
  }

  onLike(post: PostModel | CommentModel, action: string): void {
    this.dataService.react(post, action)
  }

  onSubmit(post: PostModel | null, commentBody: string) {
    this.dataService.addCommentToPost(post, commentBody)
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
