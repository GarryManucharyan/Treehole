import { PostModel, CommentModel } from '../post-models';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

export class DataService {

  public currentPageSubject: BehaviorSubject<{ currentPage: number | null, pageSize: number | null }>;
  constructor(private http: HttpClient) {
    this.currentPageSubject = new BehaviorSubject<{ currentPage: number | null, pageSize: number | null }>({ currentPage: null, pageSize: null });
  }

  public localData: PostModel[] = []

  getAllPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>("https://jsonplaceholder.typicode.com/posts").pipe(map(posts => {
      posts = posts.map(post => {
        post.likesCount = Math.floor(Math.random() * 15);
        post.dislikesCount = Math.floor(Math.random() * 5);
        post.comments = [];
        return post
      })
      return posts
    }))
  }

  getCommentsByPostId(postId: number): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
  }

  getPageData(pageDataProps: { pageNumber: number, pageSize: number } = { pageNumber: 1, pageSize: 10 }) {
    if (pageDataProps.pageNumber && pageDataProps.pageSize) {
      let firstElemIndex = (pageDataProps.pageNumber - 1) * pageDataProps.pageSize;
      let lastElemIndex = ((pageDataProps.pageNumber - 1) * pageDataProps.pageSize) + pageDataProps.pageSize;
      let result = this.localData.slice(firstElemIndex, lastElemIndex);
      return result
    }
    return null
  }
}
