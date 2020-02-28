import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import  gql  from 'graphql-tag'
import { Apollo } from 'apollo-angular'

@Injectable({
  providedIn: 'root'
})
export class TransactionThingsService {

  constructor(private apollo:Apollo) { }

  InsertTransaction(UId: number,HId: number,TId: number,PId: number,CId: number,EId: number,Q: number,date: string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation InsertTransaction($UId: Int!,$HId: Int!,$TId: Int!,$PId: Int!,$CId: Int!,$EId: Int!,$Q: Int!,$Date: String!){
          InsertTransaction(UId: $UId,HId: $HId,TId: $TId,PId: $PId,CId: $CId,EId: $EId,Q: $Q,Date: $Date){
            CarId
            Date
            EventId
            HotelId
            PlaneId
            Quantity
            TrainId
            UserId
          }
        }
      `,
      variables:{
        "CId": CId,
        "Date": date,
        "EId": EId,
        "HId": HId,
        "PId": PId,
        "Q": Q,
        "TId": TId,
        "UId": UId
      },
      fetchPolicy: 'no-cache'
    })
  }

  
}
