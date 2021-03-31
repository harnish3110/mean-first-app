import { Post } from '../components/posts/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postSubject = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  public getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map((post: any) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        });
      }))
      .subscribe(data => {
        this.posts = data;
        this.postSubject.next([...this.posts]);
      });
  }

  public getPostListener() {
    return this.postSubject.asObservable();
  }

  public setPost(post: Post) {
    this.http.post<{ message: string, id: string }>('http://localhost:3000/api/post', post)
      .subscribe(data => {
        console.log(data.message);
        post.id = data.id;
        this.posts.push(post);
        this.postSubject.next([...this.posts]);
      });
  }

  public deletePost(id: string) {
    const url = 'http://localhost:3000/api/post/' + id;
    this.http.delete<{ message: string }>(url)
      .subscribe(data => {
        const updatedPosts = this.posts.filter(post => post.id !== id);
        this.posts = updatedPosts;
        this.postSubject.next([...this.posts]);
      });
  }
}
