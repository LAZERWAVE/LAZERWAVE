import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators' 
import  gql  from 'graphql-tag'
import { Apollo } from 'apollo-angular'
import { Location } from '../../Model/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationThingysService {

  constructor(private apollo: Apollo) { }

  GetLocationById(Id: number): Observable<Location[]>{
    return this.apollo.query<any>({
      query: gql`
        query GetLocationById($Id: Int){
          GetLocationById(Id: $Id){
            Name
            Id
            Latitude
            Longitude
            Country
          }
        }
      `,
      variables:{
        "Id": Id
      },
      fetchPolicy:  'no-cache'
    }).pipe(map(
      result => result.data.GetLocationById
    ))
  }

  GetAllLocation(): Observable<Location[]>{
    return this.apollo.query<any>({
      query: gql`
        query GetAllLocation{
          GetAllLocation{
            Country
            Id
            Latitude
            Longitude
            Name
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetAllLocation
    ))
  }
}
