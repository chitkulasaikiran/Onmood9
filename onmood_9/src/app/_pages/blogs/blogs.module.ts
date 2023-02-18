import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogSearchComponent } from './blog-search/blog-search.component';
import { SafeHtmlPipe } from './SafeHtmlPipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogSearchPageComponent } from './blog-search-page/blog-search-page.component';


@NgModule({
  declarations: [
    SafeHtmlPipe,
    BlogListComponent,
    BlogDetailsComponent,
    BlogSearchComponent,
    BlogSearchPageComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BlogsModule { }
