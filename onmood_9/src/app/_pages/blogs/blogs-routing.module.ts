import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogSearchPageComponent } from './blog-search-page/blog-search-page.component';
import { BlogSearchComponent } from './blog-search/blog-search.component';

const routes: Routes = [
	{ path: 'category/:id', component: BlogListComponent },
	{ path: 'search/:keyword', component: BlogSearchPageComponent },
	{ path: 'blog-detail/:id', component: BlogDetailsComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BlogsRoutingModule { }
