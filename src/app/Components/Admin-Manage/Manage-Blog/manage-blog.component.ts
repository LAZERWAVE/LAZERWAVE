import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Blog } from '../../../Model/Blog';
import { BlogThingsService } from '../../../backended/blog/blog-things.service';
import { ChatThingsService } from 'src/app/backended/chathings/chat-things.service';

export interface BlogInterface {
  Id: number
	Title: string
	Content: string
	View: number
  Tumbnail: string
  Category: string
}

@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.scss']
})
export class ManageBlogComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public chat: ChatThingsService,public blogService: BlogThingsService) { }

  Blogs: Blog[];
  ShowBlog: Blog[];
  BlogInterfaces: BlogInterface[];
  dataSourcee: any;
  displayedColumns: string[] = ['Id', 'Tumbnail', 'Title', "Category",'Content','View'];

  ngOnInit() {
   this.getData();
   this.reset();
   this.init();

  }

  Content: string;

  tempInterface: BlogInterface

  initTable(){
    let x : BlogInterface;
    this.BlogInterfaces = [x]
    this.BlogInterfaces.pop()
    this.ShowBlog.forEach(e => {

      let x : BlogInterface;
      x={
        Id: e.Id,
        Title: e.Title,
        Content: e.Content,
        View: e.View,
        Tumbnail: e.Tumbnail,
        Category:e.Category
      }
      this.BlogInterfaces.push(x)
    });
    this.dataSourcee = new MatTableDataSource(this.BlogInterfaces);
    this.dataSourcee.paginator = this.paginator
  }

  getData(){
    this.BlogInterfaces = [null]
    this.blogService.GetAllBlog().subscribe(
      async result => {
        this.Blogs = result;
        await this.filter();
      }
    );
  }
  delId: number
  insView: number
  init(){
    this.insView=0
    this.insTitle=""
    this.insTumbnail=""
    this.insContent=""
    this.sure=false;
    this.delId=0;
    this.upId = 0;
    this.upTitle = ""
    this.upView=0
    this.upTumbnail=""
    this.upContent=""
    this.upCategory=""
    this.Category=" "
  }

  Category: string;

  insTitle: string
  insTumbnail: string;
  insContent: string;
  insCategory: string;
  insert(){
    if(this.insTitle == "" || this.insView < 1 || this.insTumbnail =="" || this.insContent == ""){
      alert("field cannot be empty")
      return;
    }
    this.blogService.InsertBlog(this.insTitle,this.insContent,this.insTumbnail,this.insCategory).subscribe(
      async queryy => {
        alert("insert succes <3");
        await this.getData();
      }
    )
    this.init();
    this.chat.emit("blog","new data")
  }
  
  sure: boolean
  delete(){
    if(this.delId <= 0){
      alert("must be filled");
      return;
    }
    this.sure=true;
  }

  yes(){
    this.blogService.DeleteBlog(this.delId).subscribe(
      async result =>{
        await this.getData();
      }
    )
    this.init();
  }

  no(){
    this.init();
  }

  upId: number;
  upTitle: string
  upView: number
  upTumbnail: string;
  upContent: string;
  upCategory: string;
  update(){
    if(this.upTitle == "" || this.upView < 1 || this.upTumbnail =="" || this.upContent == "" || this.upId <=0){
      alert("field cannot be empty")
      return;
    }
    this.blogService.UpdateBlog(this.upId,this.upTitle,this.upContent,this.upView,this.upTumbnail,this.upCategory).subscribe(
      async result =>{
        await this.getData()
      }
    )
    this.init()
  }

  reset(){
    this.Content="";
  }

  filter(){
    this.Blogs.sort();
    this.ShowBlog = [this.Blogs[0]];
    this.ShowBlog.pop();

    this.Blogs.forEach(e => {
      if(this.Category == "" || this.Category == e.Category){
        this.ShowBlog.push(e)
      }
    });
        
    console.log(this.ShowBlog)
    this.initTable()
  }

  
}

