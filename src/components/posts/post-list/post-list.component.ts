import { Component, OnDestroy, OnInit } from "@angular/core";
import { PostsService } from "src/services/posts.service";
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponet implements OnInit, OnDestroy {

  public posts: Post[] = [];
  private postsSubscription: Subscription;
  public isLoading: boolean = false;
  constructor(public postService: PostsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsSubscription = this.postService.getPostListener().subscribe((posts) => {
      this.posts = posts;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  public onDelete(id: string) {
    this.postService.deletePost(id);
  }
}
