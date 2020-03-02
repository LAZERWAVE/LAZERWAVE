import { Component, OnInit } from '@angular/core';
import { BlogThingsService } from '../../backended/blog/blog-things.service';
import { async } from 'rxjs/internal/scheduler/async';
import { Blog } from '../../Model/Blog';
import { Observable } from 'rxjs';
import { ChatThingsService } from 'src/app/backended/chathings/chat-things.service';
import { PenhubungService } from 'src/app/backended/penhubung.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(public router: Router,public penghubung: PenhubungService,public chat:ChatThingsService,public blogService: BlogThingsService) { }

  create: boolean;


  ngOnInit() {
    this.create = false;
    this.getBlog();
    this.chat.listen("blog").subscribe(e=>{
      alert(e)
    })
    
  }

  gotoDetail(id: number){
    this.penghubung.BlogId = id;
    this.router.navigateByUrl("BlogDetail");
  }

  toggleText(){
    this.create=!this.create;
  }

  tets(cmd: any){
		if(cmd === 'createlink') {
			let url = prompt("Enter the link here: ", "http:\/\/");
			document.execCommand(cmd, false, url);
		} else {
			document.execCommand(cmd, false, null);
		}
  }
  
  Blogs: Blog[];
  RealBlogs: Blog[];
  getBlog(){
    this.blogService.GetAllBlog().subscribe(
      async result =>{
        this.Blogs = result;
        await this.init();
      }
    )
  }

  init(){
    //INFISCWOL
    this.RealBlogs = [this.Blogs[0]];
    this.RealBlogs.pop()
    document.onscroll = function () {
      if (window.scrollY + window.innerHeight + window.innerHeight*1/5 >= document.body.scrollHeight) {
        this.addDataShow();
      }
    }.bind(this)
  }

  addDataShow(){ 
    if(this.Blogs[0] != null) this.RealBlogs.push(this.Blogs.pop());
  }
}
