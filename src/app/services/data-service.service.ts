import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from '../postModels';



@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  public currentPageSubject: BehaviorSubject<{ currentPage: number | null , pageSize: number | null }>;
  constructor(private http: HttpClient) { 
    this.currentPageSubject = new BehaviorSubject<{ currentPage: number | null , pageSize: number | null }>({ currentPage:  null, pageSize:  null });
  }

  public localData: PostModel[] = []

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

  getPageData(pageDataProps: { pageNumber: number, pageSize: number } = { pageNumber: 1, pageSize: 10 }) {
    if (pageDataProps.pageNumber && pageDataProps.pageSize) {
      let firstElemIndex = (pageDataProps.pageNumber - 1) * pageDataProps.pageSize;
      let lastElemIndex = ((pageDataProps.pageNumber - 1) * pageDataProps.pageSize) + pageDataProps.pageSize;
      let result = this.localData.slice(firstElemIndex, lastElemIndex);
      console.log("getPageData called for page " + pageDataProps.pageNumber);
      return result
    }
    return null
  }
}
