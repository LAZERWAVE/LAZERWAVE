import { Injectable } from '@angular/core';
import { Flight } from 'src/app/Model/Flight';
import { Train } from './../../Model/Train'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators' 
import  gql  from 'graphql-tag'
import {EventCard } from '../../Model/EventCard'
import { Apollo } from 'apollo-angular'

@Injectable({
  providedIn: 'root'
})
export class FlightThingsService {

  constructor(private apollo: Apollo) { }

  GetAllPlane(): Observable<Flight[]>{
    return this.apollo.query<any>({
      query: gql`
        query{
          GetAllPlane{
            Company
            EndLocation
            EndTime
            Fasilitas
            Id
            Name
            Price
            StartLocation
            StartTime
            Transit
            Tumbnail
            TransitTime
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetAllPlane
    ))
  }

  InsertFlight(Name: string,Company: string,Tumbnail: string,StartTime: number, EndTime: number,Price: number,StartLocation: string,EndLocation: string,Transit: number,TransitTime: number,Fasilitas: string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation InsertPlane($Name: String!,$Company: String!,$Tumbnail: String!,$StartTime: Float!,$EndTime: Float!,$Price: Int!,$StartLocation: String!,$EndLocation: String!,$Transit: Int!,$TransitTime: Int!,$Fasilitas: String!){
          InsertPlane(Name: $Name,Company: $Company,Tumbnail: $Tumbnail,StartTime: $StartTime,EndTime: $EndTime,Price: $Price,StartLocation: $StartLocation,EndLocation: $EndLocation,Transit: $Transit,TransitTime:$TransitTime,Fasilitas: $Fasilitas){
            Company
          }
        }
      `,
      variables:{
        "Company": Company,
        "EndLocation": EndLocation,
        "EndTime": EndTime,
        "Fasilitas": Fasilitas,
        "Name": Name,
        "Price": Price,
        "StartLocation": StartLocation,
        "StartTime": StartTime,
        "Transit": Transit,
        "TransitTime": TransitTime,
        "Tumbnail": Tumbnail
      },
      fetchPolicy: 'no-cache'
    })
  }

  DeletePlain(id: number):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
      mutation DeletePlain($Id: Int!){
        DeletePlain(Id: $Id){
          Fasilitas
        }
      }
      `,
      variables:{
        "Id": id
      },
      fetchPolicy: 'no-cache'
    })
  }

  UpdatePlain(id: number,Name: string,Company: string,Tumbnail: string,StartTime: number, EndTime: number,Price: number,StartLocation: string,EndLocation: string,Transit: number,TransitTime: number,Fasilitas: string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdatePlane($Id: Int!,$Name: String!,$Company: String!,$Tumbnail: String!,$StartTime: Float!,$EndTime: Float!,$Price: Int!,$StartLocation: String!,$EndLocation: String!,$Transit: Int!,$TransitTime: Int!,$Fasilitas: String!){
          UpdatePlane(Id: $Id,Name: $Name,Company: $Company,Tumbnail: $Tumbnail,StartTime: $StartTime,EndTime: $EndTime,Price: $Price,StartLocation: $StartLocation,EndLocation: $EndLocation,Transit: $Transit,TransitTime:$TransitTime,Fasilitas: $Fasilitas){
            Company
            Name
          }
        }
      `,
      variables:{
        "Id": id,
        "Company": Company,
        "EndLocation": EndLocation,
        "EndTime": EndTime,
        "Fasilitas": Fasilitas,
        "Name": Name,
        "Price": Price,
        "StartLocation": StartLocation,
        "StartTime": StartTime,
        "Transit": Transit,
        "TransitTime": TransitTime,
        "Tumbnail": Tumbnail
      },
      fetchPolicy: 'no-cache'
    })
  }
}


