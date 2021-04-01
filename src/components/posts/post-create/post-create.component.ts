import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
  public isLoading: boolean = false;
  public form: FormGroup;
  public imagePreview: string;

  constructor(public postService: PostsService, private route: ActivatedRoute) { }

  public ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      'content': new FormControl(null, {
        validators: [Validators.required]
      }),
      'image': new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId)
          .subscribe(data => {
            this.isLoading = false;
            this.post = { id: data.id, title: data.title, content: data.content };
            this.form.setValue({ 'title': this.post.title, 'content': this.post.content });
          });
      }
      else {
        this.mode = 'create';
        this.postId = null;
        this.post = { id: null, title: '', content: '' };;
      }
    });
  }

  public onAddPost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      const post: Post = { id: null, title: this.form.value.title, content: this.form.value.content };
      this.postService.setPost(post);
      this.form.reset();
    }
    if (this.mode === 'edit') {
      const post: Post = { id: this.postId, title: this.form.value.title, content: this.form.value.content };
      this.postService.updatePost(post);
    }
  }

  public onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }
}
