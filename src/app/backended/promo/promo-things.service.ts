import { Injectable } from '@angular/core';
import { Promo } from './../../Model/Promo'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators' 
import  gql  from 'graphql-tag'
import {EventCard } from '../../Model/EventCard'
import { Apollo } from 'apollo-angular'

@Injectable({
  providedIn: 'root'
})
export class PromoThingsService {

  constructor(private apollo: Apollo) { }

  GetAllPromo(): Observable<Promo[]>{
    return this.apollo.query<any>({
      query: gql`
        query{
          GetAllPromo{
            Id
            Content
            Tumbnail
            Name
            Kode
            periode
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetAllPromo
    ))
  }
}
