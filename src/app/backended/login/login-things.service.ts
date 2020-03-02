import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators' 
import  gql  from 'graphql-tag'
import { Apollo } from 'apollo-angular'
import { User } from '../../Model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginThingsService {

  constructor(private apollo: Apollo) { }

  getAllUser(): Observable<User[]>{
    return this.apollo.query<any>({
      query: gql`
        query allUser{
          allUser{
            Email
            FirstName
            Id
            LastName
            Password
            Phone
            Languague
            Title
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.allUser
    ))
  }

  getUserByPhoneOrEmail(email: string): Observable<User[]>{
    return this.apollo.query<any>({
      query: gql`
        query userByPhoneOrEmail($email: String!){
          userByPhoneOrEmail(email: $email){
            Email
            FirstName
            Id
            LastName
            Password
            Phone
            Languague
            Title
          }
        }
      `,
      variables:{
        "email": email
      },
      fetchPolicy:  'no-cache'
    }).pipe(map(
      result => result.data.userByPhoneOrEmail 
    ))
  }

  GetValidUserByPhoneOrEmail(email: string, pass: string): Observable<User[]>{
    return this.apollo.query<any>({
      query: gql`
        query GetValidUserByPhoneOrEmail($email: String!,$Pass: String!){
          GetValidUserByPhoneOrEmail(email: $email,Pass: $Pass){
            Email
            FirstName
            Id
            LastName
            Password
            Phone
            Languague
            Title
          }
        }  
      `,
      variables:{
        "email": email,
        "Pass": pass
      },
      fetchPolicy: 'no-cache'
    }).pipe(map(
      result => result.data.GetValidUserByPhoneOrEmail
    ))
  }

  
}


