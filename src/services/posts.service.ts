import { Post } from '../components/posts/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postSubject = new Subject<Post[]>();
  private URL: string = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient, private router: Router) { }

  public getPosts() {
    this.http.get<{ message: string, posts: any }>(this.URL)
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
    this.http.post<{ message: string, id: string }>(this.URL, post)
      .subscribe(data => {
        console.log(data.message);
        post.id = data.id;
        this.posts.push(post);
        this.postSubject.next([...this.posts]);
      });
  }

  public deletePost(id: string) {
    this.http.delete<{ message: string }>(this.URL + '/' + id)
      .subscribe(data => {
        const updatedPosts = this.posts.filter(post => post.id !== id);
        this.posts = updatedPosts;
        this.postSubject.next([...this.posts]);
      });
  }

  public getPost(id: string) {
    /* If want to return from the local copy
     return { ...this.posts.find(p => p.id === id) }; */

    return this.http.get<{ id: string, title: string, content: string, message: string }>(this.URL + '/' + id);
  }

  public updatePost(updatedPost: Post) {
    this.http.put<{ message: string }>(this.URL, updatedPost)
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
        // Both are the correct
        // this.router.navigateByUrl('/');
        this.router.navigate(['/']);
      });
  }
}
