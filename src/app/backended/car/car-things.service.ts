import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators' 
import  gql  from 'graphql-tag'
import { User } from '../../Model/user';
import {EventCard } from '../../Model/EventCard'
import { Apollo } from 'apollo-angular'
import { Car } from '../../Model/Car';

@Injectable({
  providedIn: 'root'
})
export class CarThingsService {

  constructor(private apollo: Apollo) { }

  GetAllCar(): Observable<Car[]>{
    return this.apollo.query<any>({
      query: gql`
        query GetAllCar{
          GetAllCar{
            Brand
            Capacity
            Id
            Location
            Name
            Price
            Tumbnail
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetAllCar
    ))
  }

  GetCarByLocation(location: string): Observable<Car[]>{
    return this.apollo.query<any>({
      query: gql`
      query GetCarByLocation($Location :String!){
        GetCarByLocation(Location: $Location){
          Brand
          Capacity
          Id
          Location
          Name
          Price
          Tumbnail
        }
      }
      `,
    variables:{
      "Location": location
    },
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetCarByLocation
    ))
  }
  
  
}
