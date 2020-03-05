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
  
  GetFilterCar(Name: string,Min: number,Max:number,Capacity: number,Brand: string,City: string): Observable<Car[]>{
    return this.apollo.query<any>({
      query: gql`
        query GetFilterCar($Name: String!,$Min: Int!,$Max: Int!,$Capacity: Int!,$Brand: String!,$City: String!){
          GetFilterCar(Name: $Name,Min: $Min, Max: $Max, Capacity: $Capacity,Brand: $Brand,City: $City){
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
        "Name": Name,
        "Min": Min,
        "Max": Max,
        "Capacity": Capacity,
        "Brand": Brand,
        "City": City
      },
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetFilterCar
    ))
  }
}
