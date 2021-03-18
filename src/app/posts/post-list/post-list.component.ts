import { Component } from "@angular/core";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponet {
  public posts = [
    {title: 'First Post', content: 'The content for First Post'},
    {title: 'Second Post', content: 'The content for Second Post'},
    {title: 'Third Post', content: 'The content for Third Post'}
  ];
}
