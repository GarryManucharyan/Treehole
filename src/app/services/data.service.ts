import { PostModel, CommentModel } from '../post-models';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface PageProps {
  currentPage: number,
  pageSize: number,
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public currentPageSubject: BehaviorSubject<PageProps>;
  public homePageBtnSubject: Subject<boolean>;

  constructor(private http: HttpClient) {
    this.currentPageSubject = new BehaviorSubject<PageProps>({ currentPage: 1, pageSize: 10 });
    this.homePageBtnSubject = new Subject<any>();
  }

  public localData: PostModel[] = []

  getAllPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>("https://jsonplaceholder.typicode.com/posts").pipe(map(posts => {
      return posts.map(post => {
        post.likesCount = Math.floor(Math.random() * 15);
        post.dislikesCount = Math.floor(Math.random() * 5);
        post.comments = [];
        post.isLiked = null;
        return post
      })
    }))
  }

  getPostById(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(map(post => {
      post.comments = [];
      post.isLiked = null;
      post.likesCount = Math.floor(Math.random() * 15);
      post.dislikesCount = Math.floor(Math.random() * 5);
      return post
    }))
  }

  getPostByIdFromlocalData(id: number): PostModel | null {
    const post = this.localData.find(post => {
      return post.id === id
    })
    if (post) return post
    else return null
  }

  getCommentsByPostId(postId: number): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).pipe(map(comments => {
      for (let comment of comments) {
        comment.likesCount = Math.floor(Math.random() * 12);
        comment.dislikesCount = Math.floor(Math.random() * 4);
        comment.isLiked = null;
        comment.body = comment.body.split("\n").join(" ")
      }
      return comments
    }))
  }

  getPageData(pageDataProps: PageProps = { currentPage: 1, pageSize: 10 }) {
    let firstElemIndex = (pageDataProps.currentPage - 1) * pageDataProps.pageSize;
    let lastElemIndex = ((pageDataProps.currentPage - 1) * pageDataProps.pageSize) + pageDataProps.pageSize;
    return this.localData.slice(firstElemIndex, lastElemIndex);
  }

  addCommentToPost(post: PostModel | null, comment: string) {
    const newComment: CommentModel = {
      body: comment,
      likesCount: 0,
      dislikesCount: 0,
      email: "Some_email@bldux.com",
      id: post?.comments.length || NaN,
      isLiked: null,
      postId: post?.id || NaN
    };
    post?.comments.unshift(newComment);
  }

  react(post: PostModel | CommentModel, action: string) {
    if (action === "like") {
      if (!post.isLiked) {
        if (post.isLiked === false) {
          post.dislikesCount--
        }
        post.isLiked = true;
        post.likesCount++
      }
      else {
        post.isLiked = null;
        post.likesCount--;
      }
    } else {
      if (post.isLiked || (post.isLiked === null)) {
        if (post.isLiked) {
          post.likesCount--;
        }
        post.isLiked = false;
        post.dislikesCount++;
      }
      else if (action === 'dislike') {
        post.isLiked = null;
        post.dislikesCount--;
      }
    }
  }
}
