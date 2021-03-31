import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) { }
  open(menu) {
    menu.openMenu();
  }
  createNewPost() {
    this.router.navigateByUrl('/create');
  }
  toHome() {
    this.router.navigateByUrl('/');
  }

}
