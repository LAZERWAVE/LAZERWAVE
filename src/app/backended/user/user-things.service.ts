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
export class UserThingsService {

  constructor(private apollo: Apollo) { }

  
  UpdateEvent(id: number,Languague: string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateUserLanguauge($Id: Int!, $Languague:String!){
          UpdateUserLanguauge(Id: $Id, Languague: $Languague){
            FirstName
            Languague
          }
        }
      `,
      variables:{
        "Id": id,
        "Languague":Languague
      },
      fetchPolicy: 'no-cache'
    })
  }

  UpdateData(id: number,Title: string,FirstName: string,LastName: string,Kota: string,Alamat: string,Kodepos:string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateUserData($Id:Int!,$Title:String!,$FirstName: String!,$LastName: String!,$Kota: String!,$Alamat: String!,$Kodepos:String!){
          UpdateUserData(Id: $Id,Title:$Title,FirstName: $FirstName,LastName: $LastName,Kota: $Kota,Alamat: $Alamat,Kodepos: $Kodepos){
            Alamat
          }
        }
      `,
      variables:{
        "Alamat": Alamat,
        "FirstName": FirstName,
        "Id": id,
        "Kodepos": Kodepos,
        "Kota": Kota,
        "LastName": LastName,
        "Title": Title
      },
      fetchPolicy: 'no-cache'
    })
  }
}
