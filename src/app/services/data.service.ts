import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { PostModel, CommentModel } from '../post-models';
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
    return post ? post : null;
  }

  getCommentsByPostId(postId: number): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).pipe(map(comments => {
      return comments.map(comment => {
        return {
          ...comment,
          likesCount: Math.floor(Math.random() * 12),
          dislikesCount: Math.floor(Math.random() * 4),
          isLiked: null,
          body: comment.body.split("\n").join(" ")
        }
      })
    }))
  }

  getPageData(pageDataProps: PageProps = { currentPage: 1, pageSize: 10 }) {
    let firstElemIndex = (pageDataProps.currentPage - 1) * pageDataProps.pageSize;
    let lastElemIndex = ((pageDataProps.currentPage - 1) * pageDataProps.pageSize) + pageDataProps.pageSize;
    return this.localData.slice(firstElemIndex, lastElemIndex);
  }

  addCommentToPost(post: PostModel, comment: string) {
    const newComment: CommentModel = {
      body: comment,
      likesCount: 0,
      dislikesCount: 0,
      email: "Some_email@bldux.com",
      id: post?.comments.length || NaN,
      isLiked: null,
      postId: post?.id || NaN
    };

    this.http.post(`https://jsonplaceholder.typicode.com/comments`, newComment).subscribe(res => {
      console.log(res);
    })
    post?.comments.unshift(newComment);
  }

  react(post: PostModel | CommentModel, action: "like" | "dislike") {
    if (action === "like") {
      switch (post.isLiked) {
        case (null): {
          post.likesCount++;
          post.isLiked = true;
          break
        };
        case (true): {
          post.likesCount--;
          post.isLiked = null;
          break
        }
        case (false): {
          post.likesCount++;
          post.dislikesCount--;
          post.isLiked = true;
          break
        }
      }
    } else {
      switch (post.isLiked) {
        case (null): {
          post.dislikesCount++;
          post.isLiked = false;
          break
        };
        case (true): {
          post.dislikesCount++;
          post.likesCount--;
          post.isLiked = false;
          break
        }
        case (false): {
          post.dislikesCount--;
          post.isLiked = null;
          break
        }
      }
    }
  }
}
