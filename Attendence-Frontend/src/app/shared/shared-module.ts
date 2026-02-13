import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterLink, RouterOutlet} from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    RouterOutlet,
  ],
  exports:[
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    RouterOutlet,
  ]
})
export class SharedModule { }
