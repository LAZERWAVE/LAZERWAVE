import { Injectable } from '@angular/core';
import { Blog } from '../../Model/Blog';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators' 
import  gql  from 'graphql-tag'
import { User } from '../../Model/user';

import { Apollo } from 'apollo-angular'
import * as io from 'socket.io-client'
import { Socket } from 'net';

@Injectable({
  providedIn: 'root'
})
export class BlogThingsService {

  socket: any;
  readonly uri: string = 'ws://localhost:1000';

  constructor(private apollo: Apollo) {
    this.socket = io(this.uri);
   }

  GetAllBlog(): Observable<Blog[]>{
    return this.apollo.query<any>({
      query: gql`
        query{
          GetAllBlog{
            Content
            Id
            Title
            Tumbnail
            View
            Category
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetAllBlog
    ))
  }

  InsertBlog(Title: string,Content: string,Tumbnail: string,Category: string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation InsertBlog($Title: String,$Content: String!,$Tumbnail: String!,$Category: String!){
          InsertBlog(Title: $Title,Content: $Content,Tumbnail: $Tumbnail,Category: $Category){
            Content
            Id
            Title
            Tumbnail
            View
          }
        }
      `,
      variables:{
        "Content": Content,
        "Title": Title,
        "Tumbnail": Tumbnail,
        "Category": Category
      },
      fetchPolicy: 'no-cache'
    })
  }


  DeleteBlog(id: number):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteBlog($Id: Int!){
          DeleteBlog(Id: $Id){
            Category
            Content
            Id
            Title
            Tumbnail
            View
          }
        }
      `,
      variables:{
        "Id": id
      },
      fetchPolicy: 'no-cache'
    })
  }

  UpdateBlog(id: number,Title: string,Content: string,View: number,Tumbnail: string,Category: string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
      mutation UpdateBlog($Id: Int!,$Title: String,$Content: String!,$View: Int!,$Tumbnail: String!,$Category: String!){
        UpdateBlog(Id: $Id,Title: $Title,Content: $Content,View: $View,Tumbnail: $Tumbnail,Category: $Category){
          Content
          Id
          Title
          Tumbnail
          View
        }
      }
      `,
      variables:{
        "Category": Category,
        "Content": Content,
        "Id": id,
        "Title": Title,
        "View": View,
        "Tumbnail": Tumbnail
      },
      fetchPolicy: 'no-cache'
    })
  }

  GetBlogById(Id: number): Observable<Blog[]>{
    return this.apollo.query<any>({
      query: gql`
        query GetBlogById($Id: Int!){
          GetBlogById(Id: $Id){
            Category
            Content
            Id
            Title
            Tumbnail
            View
          }
        }
      `,
      variables:{
        "Id": Id
      },
      fetchPolicy:  'no-cache'
    }).pipe(map(
      result => result.data.GetBlogById
    ))
  }
  
  GetTrendingBlog(): Observable<Blog[]>{
    return this.apollo.query<any>({
      query: gql`
        query{
          GetTrendingBlog{
            Category
            Content
            Id
            Title
            Tumbnail
            View
          }
        }
      `,
      fetchPolicy:  'no-cache'
    }).pipe(map(
      result => result.data.GetTrendingBlog
    ))
  }
}
