import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import  gql  from 'graphql-tag'
import { Apollo } from 'apollo-angular'

@Injectable({
  providedIn: 'root'
})
export class RegisterThingsService {

  constructor(private apollo:Apollo) { }

  InsertUser(FirstName: string,LastName: string,pass: string,email: string, phone: string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation createUser($Email: String!,$FirstName: String!,$LastName: String!,$Password: String!,$Phone: String!){
          createuser(email:$Email,firstname: $FirstName,lastname: $LastName,password: $Password,phone: $Phone){	
            FirstName
            LastName
            Email
            Id
            Password
            Phone
          }
        }
      `,
      variables:{
        "Email": email,
        "FirstName": FirstName,
        "LastName": LastName,
        "Password": pass,
        "Phone": phone
      },
      fetchPolicy: 'no-cache'
    })
  }
}
