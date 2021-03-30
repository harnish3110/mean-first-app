import { Post } from '../components/posts/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postSubject = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  public getPosts() {
    this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postSubject.next([...this.posts]);
      });
    // return [...this.posts];
  }

  public getPostListener() {
    return this.postSubject.asObservable();
  }

  public setPost(post: Post) {
    this.http.post<{ message: string }>('http://localhost:3000/api/post', post)
      .subscribe((data) => {
        console.log(data.message);
        this.posts.push(post);
        this.postSubject.next([...this.posts]);
      });


  }
}
