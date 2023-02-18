import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import AOS from 'aos';
import { ApiUrls } from 'src/app/constants/ApiUrls';
import { Blog } from 'src/app/model/blog';
import { BlogCategory } from 'src/app/model/BlogCategory';
import { BlogService } from 'src/app/services/blog.service';


@Component({
  selector: 'app-blog-search-page',
  templateUrl: './blog-search-page.component.html',
  styleUrls: ['./blog-search-page.component.css']
})
export class BlogSearchPageComponent implements OnInit {
  blogImagesPath = "";
  searchCount = 0;
  searchKeyword = "";
  blogList: Array<Blog> = [];
  blogCategoryList: Array<BlogCategory> = [];
  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.blogImagesPath = ApiUrls.BLOG_IMAGES_PATH;
    AOS.init();
    this.route.paramMap.subscribe(params => {
      // console.log(params.get('keyword'));
      let keyword = params.get('keyword');
      // console.log("------------------>"+typeof(keyword))
      this.getBlogByKeyword(String(keyword));
    });
  }

  getBlogByKeyword(keyword: string) { 
    this.blogService.getBlogsBySearch(keyword).subscribe(data => {
		const JSONData = JSON.parse(JSON.stringify(data));

      this.blogCategoryList = JSONData['blogCategories'];
      this.blogList = JSONData['blogs'];
      this.searchCount = this.blogList.length;
      this.searchKeyword = keyword;
      // console.log("searchKeyword =", this.searchKeyword);
      // this.blogList.forEach(blog => {
      //   if(blog['media_type'] === "image") {
      //     this.textualBlogCount = this.textualBlogCount + 1; 
      //   } else if(blog['media_type'] === "video"){
      //     this.videoBlogCount = this.videoBlogCount + 1;
      //   }
      // });
    })
  }

}
