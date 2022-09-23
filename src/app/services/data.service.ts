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

  getPostById(id: number | null) {
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

  addPostToLocalData(title: string, message: string) {
    this.localData.unshift({
      title: title,
      body: message,
      userId: this.localData.length,
      id: this.localData.length,
      dislikesCount: 0,
      likesCount: 0,
      isDisliked: false,
      isLiked: false,
      comments: [],
      isCommentsGot: false,
    })
  }

  addCommentToPost(comment: string, post: PostModel | null): void {
    const newComment: CommentModel = {
      body: comment,
      likesCount: 0,
      dislikesCount: 0,
      email: "Some_email@bldux.com",
      id: post?.comments.length || NaN,
      isLiked: false,
      isDisliked: false,
      postId: post?.id || NaN
    };
    post?.comments.unshift(newComment)
  }
}
