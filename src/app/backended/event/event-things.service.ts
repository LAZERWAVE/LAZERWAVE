import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators' 
import  gql  from 'graphql-tag'
import { User } from '../../Model/user';
import {EventCard } from '../../Model/EventCard'
import { Apollo } from 'apollo-angular'

@Injectable({
  providedIn: 'root'
})
export class EventThingsService {

  constructor(private apollo: Apollo) { }

  GetAllEvent(): Observable<EventCard[]>{
    return this.apollo.query<any>({
      query: gql`
        query GetAllEvent{
          GetAllEvent{
            Id
            Tumbnail
            Title
            Price
            Kategori
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetAllEvent
    ))
  }

  Get3Event(): Observable<EventCard[]>{
    return this.apollo.query<any>({
      query: gql`
        query Get3Event{
          Get3Event{
            Id
            Tumbnail
            Title
            Price
            Kategori
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.Get3Event
    ))
  }

  GetEventById(Id: number): Observable<EventCard[]>{
    return this.apollo.query<any>({
      query: gql`
      query GetEventById($Id: Int!){
        GetEventById(Id: $Id){
           Id
           Title
           Kategori
           Price
           Tumbnail
         }
       }
      `,
      variables:{
        "Id": Id
      },
      fetchPolicy:  'no-cache'
    }).pipe(map(
      result => result.data.GetEventById
    ))
  }

  InsertUser(Kategori: string,Price: string,Title: string,Tumbnail: string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation InsertEvent($Kategori: String!,$Price: Int!,$Title: String!,$Tumbnail: String!){
          InsertEvent(Kategori: $Kategori,Price: $Price,Title: $Title,Tumbnail: $Tumbnail){
            Id
            Kategori
            Price
            Title
            Tumbnail
          }
        }
      `,
      variables:{
        "Email": email,
        "FirstName": FirstName,
        "LastName": LastName,
        "Password": pass,
        "Phone": phone
      },
      fetchPolicy: 'no-cache'
    })
  }

}

