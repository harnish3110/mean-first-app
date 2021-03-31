import { Post } from '../components/posts/post.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { PostCreateComponent } from 'src/components/posts/post-create/post-create.component';
import { Title } from '@angular/platform-browser';
import { stringify } from '@angular/compiler/src/util';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postSubject = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) { }

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

  public getPost(id: string) {
    /* If want to return from the local copy
     return { ...this.posts.find(p => p.id === id) }; */

    const url = 'http://localhost:3000/api/post/' + id;
    return this.http.get<{ id: string, title: string, content: string, message: string }>(url);
  }

  public updatePost(updatedPost: Post) {
    const url = 'http://localhost:3000/api/post/';
    this.http.put<{ message: string }>(url, updatedPost)
      .subscribe(data => {
        console.log('before', this.posts);
        this.posts = this.posts.map(p => p.id === updatedPost.id ? { ...p, title: updatedPost.title, content: updatedPost.content } : p);
        console.log('after', this.posts);

        /* Can also be done like this
        const p = [...this.posts];
        const oldId = p.findIndex(x => x.id === updatedPost.id);
        p[oldId] = updatedPost;
        this.posts = p; */

        this.postSubject.next([...this.posts]);
        this.router.navigateByUrl('/');
      });
  }
}
