import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.less']
})
export class PostFormComponent implements OnInit {

  public newPostForm!: FormGroup;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newPostForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]
      ],
      message: ['', [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(1000),
      ]]
    })
    // this.newPostForm.get('title')?.valueChanges.subscribe(() => {      // <=== kodi es hatvacy im gracy chi, chem jnjum vor usumnasirem
    //   console.log(this.newPostForm.controls);
    // })
  }

  submitPost() {
    this.dataService.localData.unshift({
      title: this.newPostForm.controls['title'].value,
      body: this.newPostForm.controls['message'].value,
      userId: this.dataService.localData.length,
      id: this.dataService.localData.length,
      dislikesCount: 0,
      likesCount: 0,
      isDisliked: false,
      isLiked: false,
      comments: [],
      isCommentsGot: false,
    })
    this.onNavigateToHomePage()
  }

  onNavigateToHomePage(): void {
    this.dataService.currentPageSubject.next({ currentPage: 1, pageSize: 10 });
    this.router.navigate([""]);
  }
}
