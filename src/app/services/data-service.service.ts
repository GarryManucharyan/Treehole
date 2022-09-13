import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from '../postModels';



@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  public pageData: PostsDataModel = {
    allPosts: [],
    postsBuffer: [],
  };

  public currentPageSubject: BehaviorSubject<number> = new BehaviorSubject(1);
  public pageSizeSubject: Subject<number> = new Subject



  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>("https://jsonplaceholder.typicode.com/posts").pipe(map(posts => {
      posts = posts.map(post => {
        post.likesCount = Math.floor(Math.random() * 15);
        post.dislikesCount = Math.floor(Math.random() * 5);;
        post.commentsCount = 0;
        return post
      })
      return posts
    }))
  }

  spreadPostsByPages(pageSize: number = 10): void {
    let result: PostModel[][] = [];
    let dataPerPage: PostModel[] = [];
    for (let i = 0; i < this.pageData.allPosts.length; i++) {
      if (!(i % pageSize) && i) {
        result.push(dataPerPage);
        dataPerPage = [];
      }
      dataPerPage.push(this.pageData.allPosts[i])
    }
    if (dataPerPage.length && dataPerPage.length <= pageSize) {
      result.push(dataPerPage);
    }
    this.pageData.postsBuffer = result;
    // console.log(this.pageData.postsBuffer);
  }
}


export interface PostsDataModel {
  allPosts: PostModel[],
  postsBuffer: PostModel[][],
}
