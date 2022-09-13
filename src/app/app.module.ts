import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { registerLocaleData } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';

registerLocaleData(en);


import { PaginationComponent } from './components/pagination/pagination.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app.component';
import { PostFormComponent } from './post-form/post-form.component';

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
    NzPageHeaderModule,
    NzPaginationModule,
    HttpClientModule,
    AppRoutingModule,
    NzButtonModule,
    NzLayoutModule,
    NzSpaceModule,
    BrowserModule,
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
