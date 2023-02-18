import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/constants/ApiUrls';
import { Blog } from 'src/app/model/blog';
import { BlogCategory } from 'src/app/model/BlogCategory';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-search',
  templateUrl: './blog-search.component.html',
  styleUrls: ['./blog-search.component.css']
})
export class BlogSearchComponent implements OnInit {
  @Input() isBlogDetail!: boolean;
  blogList: Array<Blog> = [];
  blogCategoryList: Array<BlogCategory> = [];
  public totalBlogCount = 0;
  public textualBlogCount = 0;
  public videoBlogCount = 0;
  blogImagesPath = "";
  searchForm!: FormGroup;
  allTags : Array<{tagName: string, isSelected: boolean}> = [];
  selectedTags = [];
  testImage = "../../../assets/2000X1000.jpg";
  constructor(private blogService: BlogService,
    private formBuilder: FormBuilder, 
    public router: Router) { }

  ngOnInit(): void {
    this.blogImagesPath = ApiUrls.BLOG_IMAGES_PATH;
    this.loadBlogs();
    this.searchForm = this.formBuilder.group({
      keyword: ['', Validators.required]
    });
  }


  get f() { return this.searchForm.controls; }

  doSearch() {
    // let kw = this.searchForm.controls['keyword'].value; 
    if (this.searchForm.invalid) {
      // console.log("invalid")
      return;
    }
    this.router.navigate(["/blog/search/"+this.f['keyword'].value]);

  }

  loadBlogs() {
    this.blogService.getMostViewedActiveBlogs().subscribe(data => {
		const JSONData = JSON.parse(JSON.stringify(data));

      this.blogCategoryList = JSONData['blogCategories'];
      this.blogList = JSONData['blogs']; 
      this.totalBlogCount = this.blogList.length;
      let tempAllTags: any = [];
      this.blogList.forEach(blog => {
        if(blog.tags != "") {
          let tempBlogTags = blog.tags.split(",")
          tempBlogTags.forEach(blogTag => {
            let trimmedTag = blogTag.trim();
            if(tempAllTags.indexOf(trimmedTag) === -1 && trimmedTag.length > 0) {
              tempAllTags.push(trimmedTag);
            }
          });
        }
        if(blog['media_type'] === "image" || blog['media_type'] === "text") {
          this.textualBlogCount = this.textualBlogCount + 1; 
        } else if(blog['media_type'] === "video"){
          this.videoBlogCount = this.videoBlogCount + 1;
        }
      });
      let tempArray: any = [];
      tempAllTags.forEach((element: any) => {
        tempArray.push({tagName: element, isSelected: false})
      });
      this.allTags = tempArray; 
    })
  }

  filterTags(tag:any) { 
    tag.isSelected = !tag.isSelected; 
    let selectedTags:any = [];
    this.allTags.forEach(element => {
      if(element.isSelected) {
        selectedTags.push(element.tagName);
      }
    });
    this.blogService.triggerTagEvent(selectedTags);
  }

}
