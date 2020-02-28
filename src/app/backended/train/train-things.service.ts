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
}
