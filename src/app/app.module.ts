import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';

registerLocaleData(en);


import { PaginationComponent } from './components/pagination/pagination.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    PaginationComponent,
    PostListComponent,
    HeaderComponent,
    AppComponent,
    PostFormComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzPageHeaderModule,
    NzPaginationModule,
    HttpClientModule,
    AppRoutingModule,
    NzButtonModule,
    NzLayoutModule,
    NzSpaceModule,
    NzInputModule,
    BrowserModule,
    NzFormModule,
    NzListModule,
    NzIconModule,
    FormsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
