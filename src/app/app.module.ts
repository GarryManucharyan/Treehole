import { NgZorroAntdModule } from './modules/ng-zorro-antd/ng-zorro-antd.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';

import { PaginationComponent } from './components/pagination/pagination.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from './components/post/post.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    PaginationComponent,
    PostFormComponent,
    PostListComponent,
    HeaderComponent,
    PostComponent,
    AppComponent,
    DateAgoPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
