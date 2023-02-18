import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Meta, SafeUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Aos from 'aos';
import { ApiUrls } from 'src/app/constants/ApiUrls';
import { Blog } from 'src/app/model/blog';
import { Page } from 'src/app/model/page';
import { BlogService } from 'src/app/services/blog.service';
import { PageService } from 'src/app/services/page.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  testImage = "../../../assets/2000X1000.jpg";
  pageMeta!: Page;
  public selectedBlog!: Blog;
  public activeBlogs: Array<Blog> = [];
  public textualBlogCount = 0;
  public videoBlogCount = 0;
  isBlogAvailable: boolean = false;
  blogImagesPath = "";
  selectedBlogTags = [];
  blogDetailUrl = "";
  onmood9Url = "https://onmood9.com/#/blog-detail/";

  shareWhatsAppLink!: SafeUrl;
  whatsAppLink = "https://api.whatsapp.com/send?text=";
  
  shareFacebookLink!: SafeUrl;
  facebookLink = "https://www.facebook.com/sharer/sharer.php?u=https://onmood9.com/assets/media/blogs/sleepmeditation.jpg";
  facebookLinkTitle = "";
  title = "";
  // facebookLink = "https://www.facebook.com/sharer/sharer.php?u=";
  // facebookLinkTitle = "&title=Check out this blog";
  // facebookLinkTitle = "&title="+encodeURIComponent("Check out this blog");

  shareTwitterLink!: SafeUrl;
  twitterLink = "https://twitter.com/intent/tweet?source=tweetbutton&text=";

  sharePinterestLink!:SafeUrl;
  PinterestLink = "https://in.pinterest.com/pin/create/button/?guid=rdLjuKuj_Cr1-1&url=";
  imageLink="=&media=https://onmood9.com/onmood9.com/assets/media/blogs/sleepmeditation.jpg";
  shareInstagramLink!:SafeUrl;
  InstagramLink = "https://api.instagram.com/direct/new/";


  shareLinkedInLink!:SafeUrl;
  LinkedInTitle = "";
  LinkedInLink="https://www.linkedin.com/shareArticle?mini=true&url="

  

  deviceWidth: number = 0;
  deviceHeight: number = 0;

  descriptionReadMore = "";

  constructor(public router: Router, 
    private route: ActivatedRoute,
    private titleService: Title,
    private metaTagService: Meta,
    private sanitizer: DomSanitizer,
    private pageService: PageService,
    private blogService: BlogService,
    private storageService: StorageService) {
      this.route.paramMap.subscribe(params => {
        this.blogDetailUrl = this.onmood9Url + Number(params.get('id')); 
        this.loadBlog(String(params.get('id')));
      });
      this.getMetaInfo();
      this.setupFacebookMeta();

  }

  ngOnInit(): void {
    this.deviceWidth = window.screen.width;
    this.deviceHeight = window.screen.height;
    this.blogImagesPath = ApiUrls.BLOG_IMAGES_PATH;
    Aos.init();   
  }
  loadBlog(id: string) {
    this.blogService.getBlogById(id).subscribe(data => {
      const JSONData = JSON.parse(JSON.stringify(data));

      if(JSONData['blogs'].length > 0) {
        this.selectedBlog = JSONData['blogs'][0];
        if(this.selectedBlog && this.selectedBlog.status === "inactive") {
          this.router.navigate(['/home']);
        }
        // console.log("selectedBlog:"+ this.selectedBlog)
        this.isBlogAvailable = true;
        this.increaseViewCount(id, this.selectedBlog.view_count);
        // this.blogDetailUrl = this.onmood9Url + this.selectedBlog.id;
        this.shareWhatsAppLink = this.whatsAppLink +  encodeURIComponent(this.selectedBlog.title)+encodeURIComponent(this.onmood9Url + this.selectedBlog.id) ;
        this.facebookLinkTitle = "&p[title]="+encodeURIComponent(this.selectedBlog.title);
        this.shareFacebookLink = this.facebookLink +encodeURIComponent(this.onmood9Url + this.selectedBlog.id) + this.facebookLinkTitle ;
        this.shareTwitterLink = this.twitterLink + encodeURIComponent(this.selectedBlog.title)+"&url="+encodeURIComponent(this.onmood9Url + this.selectedBlog.id);
        this.title='&description='+encodeURIComponent(this.selectedBlog.title);
        this.sharePinterestLink = this.PinterestLink + encodeURIComponent(this.onmood9Url + this.selectedBlog.id) + this.imageLink + this.title;
        this.shareInstagramLink = this.InstagramLink + encodeURIComponent(this.onmood9Url + this.selectedBlog.id);
        this.LinkedInTitle="&title="+encodeURIComponent(this.selectedBlog.title);
        this.shareLinkedInLink = this.LinkedInLink + encodeURIComponent(this.onmood9Url + this.selectedBlog.id)+this.LinkedInTitle;
        // this.shareWhatsAppLink = this.whatsAppLink + encodeURIComponent(this.onmood9Url + this.selectedBlog.id) ;
        
        // this.shareFacebookLink = this.facebookLink + encodeURIComponent(this.onmood9Url + this.selectedBlog.id + this.facebookLinkTitle);
        // this.shareFacebookLink = this.facebookLink + encodeURIComponent(this.onmood9Url + this.selectedBlog.id) ;
        // this.shareTwitterLink = this.twitterLink + encodeURIComponent(this.onmood9Url + this.selectedBlog.id);
        
        // console.log(this.selectedBlog)
      }
    })
  }

  public openBlog(blog: Blog) {
    this.storageService.storeItem("selectedBlog", JSON.stringify(blog));
    this.selectedBlog = blog;
    window.scrollTo(0, 0)
  }


  getMetaInfo() {
		this.pageService.getPageMetaByName('Blog_Page').subscribe( response=> {
      const JSONData = JSON.parse(JSON.stringify(response));

			if(JSONData['result'] === "success") {
				if(JSONData['pages'].length > 0) {
					this.pageMeta = JSONData['pages'][0];
					// console.log(this.pageMeta)
          this.setupFacebookMeta();
				}
			}
		}, error=> {
			// console.log("Guest Home Component metainfo error:"+error);
		})
	}

	

  updateMetaFromBlog() {
    // console.log(this.pageMeta);    
  }



  setupFacebookMeta() {
    this.metaTagService.updateTag({ property: "og:url", content: "https://onmood9.com/#/blog-detail/3"});
    this.metaTagService.updateTag({ property: "og:type", content: "article"});
    this.metaTagService.updateTag({ property: "og:title", content: "Blog detail page title"});
    this.metaTagService.updateTag({ property: "og:description", content: "Blog detail description"});
    this.metaTagService.updateTag({ property: "og:image", content: "https://onmood9.com/onmood9.com/assets/media/blogs/sleepmeditation.jpg"});
		// this.metaTagService.addTags([
		// 	{ property: 'og:url', content: 'http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html'},
		// 	{ property: 'og:type', content: 'article'},
		// 	{ property: 'og:title', content: 'When Great Minds Don’t Think Alike'},
		// 	{ property: 'og:description', content: 'How much does culture influence creative thinking?'},
		// 	{ property: 'og:image', content: 'http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg'},
		// ]);
	}


  increaseViewCount(id: string, count: number) {
    this.blogService.increaseViewCount(id, count).subscribe(data => {
      // console.log("increaseViewCount: "+JSON.stringify(data))
    })
  }

}
