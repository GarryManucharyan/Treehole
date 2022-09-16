import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';

registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzCommentModule,
    NzButtonModule,
    NzLayoutModule,
    NzSpaceModule,
    NzInputModule,
    NzFormModule,
    NzListModule,
    NzIconModule,
  ],
   exports: [
    CommonModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzCommentModule,
    NzButtonModule,
    NzLayoutModule,
    NzSpaceModule,
    NzInputModule,
    NzFormModule,
    NzListModule,
    NzIconModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
})
export class NgZorroAntdModule { }
