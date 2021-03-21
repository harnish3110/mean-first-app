import { Post } from '../components/posts/post.model';
import { Subject } from 'rxjs';

// @Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postSubject = new Subject<Post[]>();

  public getPosts(): Post[] {
    console.log(this.posts);
    return [...this.posts];
  }

  public getPostListener() {
    return this.postSubject.asObservable();
  }

  public setPost(post: Post) {
    console.log('HS');
    this.posts.push(post);
    this.postSubject.next([...this.posts]);
  }
}
