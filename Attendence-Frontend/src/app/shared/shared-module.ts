import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterLink, RouterOutlet} from '@angular/router';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent } from 'ng-zorro-antd/form';
import { NzRowDirective, NzColDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    RouterOutlet,
    NzDatePickerModule,
    NzRowDirective,
    NzColDirective,
    NzCardModule,
    NzFormDirective,
    ReactiveFormsModule,
    NzInputDirective,
    NzButtonComponent,
    ReactiveFormsModule,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormDirective,
    NzInputDirective,
    NzInputGroupComponent, // ✅ required
    NzButtonComponent,
    NzIconModule,
  ],
  exports:[

    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    RouterOutlet,
    NzDatePickerModule,
    NzRowDirective,
    NzColDirective,
    NzCardModule,
    NzFormDirective,
    ReactiveFormsModule,
    NzInputDirective,
    NzButtonComponent,
    ReactiveFormsModule,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormDirective,
    NzInputDirective,
    NzInputGroupComponent, // ✅ required
    NzButtonComponent,
    NzIconModule,
  ]
})
export class SharedModule { }
