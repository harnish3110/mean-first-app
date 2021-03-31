import { NgModule } from "@angular/core";

//Material Theme
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule
  ]

})
export class MaterialModule { }
