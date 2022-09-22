import { PostModel, CommentModel } from '../post-models';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



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
    return this.http.get<PostModel[]>(environment.postsUrl).pipe(map(posts => {
      posts = posts.map(post => {
        post.likesCount = Math.floor(Math.random() * 15);
        post.dislikesCount = Math.floor(Math.random() * 5);
        post.comments = [];
        return post
      })
      return posts
    }))
  }

  getPostById(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${environment.postsUrl}/${id}`).pipe(map(post => {
      post.likesCount = Math.floor(Math.random() * 15);
      post.dislikesCount = Math.floor(Math.random() * 5);
      post.isDisliked = false;
      post.isLiked = false;
      if (!post.isCommentsGot) {
        this.getCommentsByPostId(id).subscribe(comments => {
          for (let comment of comments) {
            comment.likesCount = Math.floor(Math.random() * 10);
            comment.dislikesCount = Math.floor(Math.random() * 3);
            comment.isLiked = false;
            comment.isDisliked = false;
            comment.body = comment.body.split("\n").join(" ")
          }
          post.comments = comments;
          post.isCommentsGot = true;
        })
      }
      return post;
    }))
  }

  getPostDataByIdFromLocalData(id: string | null): PostModel | null {
    let result: PostModel | null = null;
    if (id) {
      let data = this.localData.find(post => {
        return post.id === +id
      })
      if (data) return data
    }
    return result
  }

  getCommentsByPostId(postId: number): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${environment.postsUrl}/${postId}/comments`)
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
