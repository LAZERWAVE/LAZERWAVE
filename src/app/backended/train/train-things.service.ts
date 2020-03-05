import { Injectable } from '@angular/core';
import { Train } from './../../Model/Train'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators' 
import  gql  from 'graphql-tag'
import {EventCard } from '../../Model/EventCard'
import { Apollo } from 'apollo-angular'

@Injectable({
  providedIn: 'root'
})

export class TrainThingsService {

  constructor(private apollo: Apollo) { }

  GetAllTrain(): Observable<Train[]>{
    return this.apollo.query<any>({
      query: gql`
        query GetAllTrain{
          GetAllTrain{
            Class
            EndLocation
            EndTime
            Id
            Name
            Price
            StartLocation
            StartTime
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetAllTrain
    ))
  }

  GetTrainByStartAndEnd(sl: string,el: string): Observable<Train[]>{
    return this.apollo.query<any>({
      query: gql`
        query GetTrainByStartAndEnd($StartLocation: String!, $EndLocation: String!){
          GetTrainByStartAndEnd(StartLocation: $StartLocation, EndLocation: $EndLocation){
            Class
            EndLocation
            EndTime
            Id
            Name
            Price
            StartLocation
            StartTime
          }
        }
      `,
      variables:{
        "StartLocation": sl,
        "EndLocation": el
      },
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetTrainByStartAndEnd
    ))
  }


  InsertTrain(name: string,Class: string, startTime: number,endTime: number,price: number,startLocation: string,endLocation: string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation InsertTrain($name: String!,$class: String!,$start_time: Float!,$end_time: Float!,$price: Int!,$start_location: String!,$end_location: String!){
          InsertTrain(Name: $name,Class: $class,StartTime: $start_time,EndTime: $end_time,Price: $price,StartLocation: $start_location,EndLocation: $end_location){
            Class
            EndLocation
            EndTime
            Id
            Name
            Price
            StartLocation
            StartTime
          }
        }
      `,
      variables:{
        "class": Class,
        "end_location": endLocation,
        "end_time": endTime,
        "name": name,
        "price": price,
        "start_location": startLocation,
        "start_time": startTime
      },
      fetchPolicy: 'no-cache'
    })
  }


  DeleteTrain(id: number):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteTrain($Id: Int!){
          DeleteTrain(Id: $Id){
            Class
            EndLocation
            EndTime
            Id
            Name
            Price
            StartLocation
            StartTime
          }
        }
      `,
      variables:{
        "Id": id
      },
      fetchPolicy: 'no-cache'
    })
  }

  UpdateTrain(id: number,name: string,Class: string, startTime: number,endTime: number,price: number,startLocation: string,endLocation: string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateTrain($Id: Int!,$name: String!,$class: String!,$start_time: Float!,$end_time: Float!,$price: Int!,$start_location: String!,$end_location: String!){
          UpdateTrain(Id: $Id,Name: $name,Class: $class,StartTime: $start_time,EndTime: $end_time,Price: $price,StartLocation: $start_location,EndLocation: $end_location){
            Class
            EndLocation
            EndTime
            Id
            Name
            Price
            StartLocation
            StartTime
          }
        }
      `,
      variables:{
        "Id": id,
        "class": Class,
        "end_location": endLocation,
        "end_time": endTime,
        "name": name,
        "price": price,
        "start_location": startLocation,
        "start_time": startTime
      },
      fetchPolicy: 'no-cache'
    })
  }

  GetFilterTrain(Class: string,start_time: number,end_time: number,name: string,sl: string,el: string): Observable<Train[]>{
    return this.apollo.query<any>({
      query: gql`
        query GetFilterTrain($Class: String!,$StartTime: Float!,$EndTime: Float!,$Name: String!,$StartLocation: String!,$EndLocation: String!){
          GetFilterTrain(Class: $Class, StartTime: $StartTime, EndTime: $EndTime, Name: $Name,StartLocation: $StartLocation,EndLocation: $EndLocation){
            Class
            EndLocation
            EndTime
            Id
            Name
            Price
            StartLocation
            StartTime
          }
        }
      `,
      variables:{
        "Class": Class,
        "EndTime": end_time,
        "Name": name,
        "StartTime": start_time,
        "StartLocation": sl,
        "EndLocation": el
      },
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetFilterTrain
    ))
  }
}
