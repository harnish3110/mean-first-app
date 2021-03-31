import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router'
import { PostCreateComponent } from "src/components/posts/post-create/post-create.component";
import { PostListComponet } from "src/components/posts/post-list/post-list.component";


/* empty path means root page, localhost:4200
  'create' means localhost:4200/create */
const routes: Routes = [
  { path: '', component: PostListComponet },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:postId', component: PostCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
