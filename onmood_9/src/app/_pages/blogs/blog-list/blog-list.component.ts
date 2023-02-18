import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Aos from 'aos';
import { ApiUrls } from 'src/app/constants/ApiUrls';
import { ACTIVE_BLOGS, SELECTED_BLOG } from 'src/app/constants/Constants';
import { Blog } from 'src/app/model/blog';
import { BlogCategory } from 'src/app/model/BlogCategory';
import { Page } from 'src/app/model/page';
import { BlogService } from 'src/app/services/blog.service';
import { PageService } from 'src/app/services/page.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'app-blog-list',
	templateUrl: './blog-list.component.html',
	styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
	maxSize = 6;
	title = 'Mindfulness & Mood Meditation Techniques | On Mood 9';
  blogList: Array<Blog> = [];
  blogCategoryList: Array<BlogCategory> = [];
  public totalBlogCount = 0;
  public textualBlogCount = 0;
  public videoBlogCount = 0;
  blogImagesPath = "";
  pageMeta!: Page;
  lastBlog!: Blog;
  pageNumber = 1;
  constructor(private titleService: Title,
    private metaTagService: Meta,
    private blogService: BlogService, 
    public router: Router,
    private route: ActivatedRoute,
    private pageService: PageService,
    private storageService: StorageService) { 
      this.blogService.tagClickEvent.subscribe(selectedTags => this.fetchBlogsByTags(selectedTags));
      this.setupFacebookMeta();
    }

  ngOnInit() {
    this.blogImagesPath = ApiUrls.BLOG_IMAGES_PATH;
    Aos.init();
    // this.getMetaInfo();
    // this.loadBlogs();
    this.pageNumber = 1;
    this.route.paramMap.subscribe(params => { 
      let catType = params.get('id'); 
      if(catType === "video") {
        this.loadVideoBlogs();
      } else if(catType === "textual") {
        this.loadTextualBlogs();
      } else if(catType === "all") {
        this.loadBlogs();
      } else if(!isNaN(Number(catType))){
        let  numberValue = String(catType); 
        this.loadCategoryBlogs(numberValue);
      } else{
          // console.log('Not a Number');
      }
    })
  }

  changePage(event:any) {
    this.pageNumber = event;
    window.scroll(0,0)
  }

  fetchBlogsByTags(selectedTags: string) {
    this.blogService.getTagBasedBlogs(selectedTags).subscribe(data => {
		const JSONData = JSON.parse(JSON.stringify(data));

      this.blogCategoryList = JSONData['blogCategories'];
      this.blogList = JSONData['blogs'];
    }, error=> {
			// console.log("fetchBlogsByTags error:"+error);
		});
  }

  processBlogs(data: any) {
    this.blogCategoryList = data['blogCategories'];
    this.blogList = data['blogs'];
    this.pageNumber = 1;
    this.totalBlogCount = this.blogList.length;
    // this.blogList.forEach(blog => {
    //   if(blog['media_type'] === "image" || blog['media_type'] === "text") {
    //     this.textualBlogCount = this.textualBlogCount + 1; 
    //   } else if(blog['media_type'] === "video"){
    //     this.videoBlogCount = this.videoBlogCount + 1;
    //   }
    // });
  }

  loadTextualBlogs() {
    this.blogService.getTextualBlogs().subscribe(data => {
      this.processBlogs(data);
    })
  }

  loadVideoBlogs() {
    this.blogService.getVideoBlogs().subscribe(data => {
      this.processBlogs(data);
    })
  }
  
  loadCategoryBlogs(categoryId:string) {
    this.blogService.getCategoryBlogs(categoryId).subscribe(data => {
      this.processBlogs(data);
    })
  }

  loadBlogs() {
    // let d = new Date();
    this.blogService.getActiveBlogs().subscribe(data => {
      this.processBlogs(data);
    })
  }
  public openBlog(blog: Blog) {

    this.storageService.storeItem(SELECTED_BLOG, JSON.stringify(blog));
    this.storageService.storeItem(ACTIVE_BLOGS, JSON.stringify(this.blogList));

    this.router.navigate(["blog-detail"]);
  }



  getMetaInfo() {
		this.pageService.getPageMetaByName('Blog_Page').subscribe( data=> {
			const JSONData = JSON.parse(JSON.stringify(data));

			if(JSONData['result'] === "success") {
				if(JSONData['pages'].length > 0) {
					this.pageMeta = JSONData['pages'][0];
					// console.log(this.pageMeta)
					this.setMetaInfo(this.pageMeta);
				}
			}
		}, error=> {
			// console.log("Guest Home Component metainfo error:"+error);
		})
	}

	setMetaInfo(pageMeta: Page) {
		this.titleService.setTitle(pageMeta.meta_title);
    this.metaTagService.updateTag(
      { name: 'description', content: pageMeta.meta_description }
    );

		this.metaTagService.addTags([
      { name: 'keywords', content: pageMeta.meta_keywords },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Onmood9' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: pageMeta.modified_on, scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);
	}

  setupFacebookMeta() {
    this.metaTagService.updateTag({ property: "og:url", content: "https://onmood9.com/#/blog-detail/3"});
    this.metaTagService.updateTag({ property: "og:type", content: "article"});
    this.metaTagService.updateTag({ property: "og:title", content: "Blog page title"});
    this.metaTagService.updateTag({ property: "og:description", content: "Blog page description"});
    this.metaTagService.updateTag({ property: "og:image", content: "https://onmood9.com/onmood9.com/assets/media/blogs/sleepmeditation.jpg"});
  }

  
  loadNextPage1() {
    this.blogService.getNextActiveBlogs(this.lastBlog.publish_date).subscribe(data => {
		const JSONData = JSON.parse(JSON.stringify(data));

      this.blogCategoryList = JSONData['blogCategories'];
      this.blogList = JSONData['blogs'];
      this.totalBlogCount = JSONData['totalCount'];// this.blogList.length;
      this.blogList.forEach(blog => {
        // console.log(blog.title)
        if(blog['media_type'] === "image" || blog['media_type'] === "text") {
          this.textualBlogCount = this.textualBlogCount + 1; 
        } else if(blog['media_type'] === "video"){
          this.videoBlogCount = this.videoBlogCount + 1;
        }
      });
    })
  }

  getTodayDate() {
    let d= new Date();
    let todayDate = "";
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    todayDate = todayDate+""+year;
    todayDate = todayDate+"-"+ ((month < 10) ? "0"+month : month);  
    todayDate = todayDate+"-"+ ((date < 10) ? "0"+date : date);  
    return todayDate;

  }

}
