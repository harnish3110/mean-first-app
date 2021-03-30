import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostsService } from "src/services/posts.service";
import { Post } from "../post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  constructor(public postService: PostsService) { }

  public onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = { id: null, title: form.value.title, content: form.value.content };
    this.postService.setPost(post);
    form.resetForm();
  }
}
