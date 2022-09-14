import { FormGroup, Validators, FormBuilder } from '@angular/forms';;
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
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newPostForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]
      ],
      message: ['', [
        Validators.required,
        Validators.minLength(3),
      ]]
    })
    // this.newPostForm.get('title')?.valueChanges.subscribe(() => {
    //   console.log(this.newPostForm.controls);
    // })
  }

  submitPost() {
    console.log("bldux");
  }

  onNavigateToHomePage(): void {
    this.router.navigate([""])
  }

}
