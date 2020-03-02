import { Component, OnInit } from '@angular/core';
import { PenhubungService } from 'src/app/backended/penhubung.service';
import { BlogThingsService } from 'src/app/backended/blog/blog-things.service';
import { async } from 'rxjs/internal/scheduler/async';
import { Blog } from 'src/app/Model/Blog';
import { Router } from '@angular/router';
import { ShareButtonModule } from '@ngx-share/button';


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  constructor(public router:Router,public penghubung: PenhubungService,public blogService:BlogThingsService) { }

  Blogs: Blog[]
  Trending: Blog[]
  ngOnInit() {
    this.getData();
    this.getTrendingBlog()
  }


  getData(){
    this.blogService.GetBlogById(this.penghubung.BlogId).subscribe(
      async result =>{
        this.Blogs = result
        await this.getTrendingBlog();
      }
    )
  }

  gotoDetail(id: number){
    this.penghubung.BlogId = id;
    this.router.navigateByUrl("BlogDetail");
  }

  getTrendingBlog(){
    this.blogService.GetTrendingBlog().subscribe(
      async result =>{
        this.Trending = result;
        await console.log(result)
      }
    )
  }
}
