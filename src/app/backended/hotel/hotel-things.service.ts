import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Hotel } from 'src/app/Model/Hotel';
import  gql  from 'graphql-tag'
import { map, max } from 'rxjs/operators';
import { type } from 'os';

@Injectable({
  providedIn: 'root'
})
export class HotelThingsService {

  constructor(private apollo: Apollo) { }

  GetAllHotel(): Observable<Hotel[]>{
    return this.apollo.query<any>({
      query: gql`
        query GetAllHotel{
          GetAllHotel{
            Address
            Count
            Fasilitas
            Id
            Latitude
            Longitude
            Name
            Price
            Star
            Tumbnail
            Type
            DiscountPrice
            AvailableRoom
            Area
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetAllHotel
    ))
  }

  GetFillterHotel(Area: string,Fasilitas: string,Kategori: string,Name: string,Star: number,Max: number,Min: number): Observable<Hotel[]>{
    return this.apollo.query<any>({
      query: gql`
        query GetFillterHotel($Name: String! ,$Star: Int! ,$Fasilitas: String! ,$Area: String! ,$Kategori: String!,$Max: Int!,$Min: Int!){
          GetFillterHotel(Name: $Name,Star: $Star,Fasilitas: $Fasilitas,Area: $Area,Kategori: $Kategori,Max: $Max,Min: $Min){
            Address
            Area
            AvailableRoom
            Count
            DiscountPrice
            Fasilitas
            Id
            Latitude
            Longitude
            Name
            Price
            Star
            Tumbnail
            Type
          }
        }
      
      `,
      variables:{
        "Area": Area,
        "Fasilitas": Fasilitas,
        "Kategori": Kategori,
        "Name": Name,
        "Star": Star,
        "Max": Max,
        "Min": Min
      },
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetFillterHotel
    ))
  }

  InsertHotel(Name: string,Price: number,Tumbnail: string,Type: string,Fasilitas: string,Address: string,Latitude: number,Longitude: number,Star: number,Count: number,DiscountPrice: number,AvailableRoom: number,Area: string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation InsertHotel($Name: String!,$Price: Int!,$Tumbnail: String!,$Type: String!,$Fasilitas: String!,$Address: String!,$Latitude: Float!,$Longitude: Float!,$Star: Int!,$Count: Int!,$DiscountPrice: Int!,$AvailableRoom: Int!,$Area: String!,){
          InsertHotel(Name: $Name,Price: $Price,Tumbnail: $Tumbnail,Type: $Type,Fasilitas: $Fasilitas,Address: $Address,Latitude: $Latitude,Longitude: $Longitude,Star: $Star,Count: $Count,DiscountPrice: $DiscountPrice,AvailableRoom: $AvailableRoom,Area: $Area){
            Address
            Name
          }
        }
      `,
      variables:{
        "Name": Name,
        "Price": Price,
        "Tumbnail": Tumbnail,
        "Type": Type,
        "Fasilitas": Fasilitas,
        "Address": Address,
        "Latitude": Latitude,
        "Longitude": Longitude,
        "Star": Star,
        "Count": Count,
        "DiscountPrice": DiscountPrice,
        "AvailableRoom": AvailableRoom,
        "Area": Area
      },
      fetchPolicy: 'no-cache'
    })
  }


  DeleteHotel(id: number):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteHotel($Id: Int!){
          DeleteHotel(Id: $Id){
            Id
          }
        }
      `,
      variables:{
        "Id": id
      },
      fetchPolicy: 'no-cache'
    })
  }

  UpdateHotel(id: number,Name: string,Price: number,Tumbnail: string,Type: string,Fasilitas: string,Address: string,Latitude: number,Longitude: number,Star: number,Count: number,DiscountPrice: number,AvailableRoom: number,Area: string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateHotel($Id: Int!,$Name: String!,$Price: Int!,$Tumbnail: String!,$Type: String!,$Fasilitas: String!,$Address: String!,$Latitude: Float!,$Longitude: Float!,$Star: Int!,$Count: Int!,$DiscountPrice: Int!,$AvailableRoom: Int!,$Area: String!,){
          UpdateHotel(Id: $Id,Name: $Name,Price: $Price,Tumbnail: $Tumbnail,Type: $Type,Fasilitas: $Fasilitas,Address: $Address,Latitude: $Latitude,Longitude: $Longitude,Star: $Star,Count: $Count,DiscountPrice: $DiscountPrice,AvailableRoom: $AvailableRoom,Area: $Area){
            Address
            Name
          }
        }
      `,
      variables:{
        "Id": id,
        "Name": Name,
        "Price": Price,
        "Tumbnail": Tumbnail,
        "Type": Type,
        "Fasilitas": Fasilitas,
        "Address": Address,
        "Latitude": Latitude,
        "Longitude": Longitude,
        "Star": Star,
        "Count": Count,
        "DiscountPrice": DiscountPrice,
        "AvailableRoom": AvailableRoom,
        "Area": Area
      },
      fetchPolicy: 'no-cache'
    })
  }

  GetClosestHotel(lat:number,lng:number): Observable<Hotel[]>{
    return this.apollo.query<any>({
      query: gql`
      query GetClosestHotel($Longitude: String!,$Latitude: String!){
        GetClosestHotel(Longitude: $Longitude,Latitude: $Latitude){
          Address
          Area
          AvailableRoom
          Count
          DiscountPrice
          Fasilitas
          Id
          Latitude
          Longitude
          Name
          Price
          Star
          Tumbnail
          Type
        }
      }
      `,
      variables:{
        "Latitude": lat.toString(),
        "Longitude": lng.toString()
      },
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetClosestHotel
    ))
  }
}




