import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';

registerLocaleData(en);

@NgModule({
  imports: [
    NzPageHeaderModule,
    NzPaginationModule,
    NzCommentModule,
    NzButtonModule,
    NzLayoutModule,
    NzSpaceModule,
    NzInputModule,
    NzModalModule,
    CommonModule,
    NzFormModule,
    NzListModule,
    NzIconModule,
    NzCardModule,
  ],
  exports: [
    NzPageHeaderModule,
    NzPaginationModule,
    NzCommentModule,
    NzButtonModule,
    NzLayoutModule,
    NzSpaceModule,
    NzInputModule,
    NzModalModule,
    CommonModule,
    NzFormModule,
    NzListModule,
    NzIconModule,
    NzCardModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
})
export class NgZorroAntdModule { }
