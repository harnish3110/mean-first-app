import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostsService } from "src/services/posts.service";
import { Post } from "../post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  public mode = 'create';
  private postId: string = undefined;
  public post: Post;

  constructor(public postService: PostsService, private route: ActivatedRoute) { }

  public ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId)
          .subscribe(data => {
            this.post = { id: data.id, title: data.title, content: data.content }
          });
      }
      else {
        this.mode = 'create';
        this.postId = null;
        this.post = { id: null, title: '', content: '' };;
      }
    });
  }

  public onAddPost(form: NgForm) {
    if (this.mode === 'create') {
      if (form.invalid) {
        return;
      }
      const post: Post = { id: null, title: form.value.title, content: form.value.content };
      this.postService.setPost(post);
      form.resetForm();
    }
    if (this.mode === 'edit') {
      if (form.invalid) {
        return;
      }
      const post: Post = { id: this.postId, title: form.value.title, content: form.value.content };
      this.postService.updatePost(post);
    }
  }
}
