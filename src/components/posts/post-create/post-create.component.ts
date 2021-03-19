import { Component, EventEmitter, Output } from "@angular/core";
import { Post } from "../post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  public postTitle: string = '';
  public postContent: string = '';
  @Output() postCreated = new EventEmitter<Post>();

  public onAddPost() {
    const post: Post = { title: this.postTitle, content: this.postContent };
    this.postCreated.emit(post);
    this.postTitle = '';
    this.postContent = '';
  }
}
