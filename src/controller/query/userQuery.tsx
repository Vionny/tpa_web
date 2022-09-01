import { gql } from "@apollo/client";

export const login=gql`mutation loginUser($email:String!,$password:String!){
    login(email:$email,password:$password)
    {id}}`

export const register = gql`mutation register ($email:String!,$password:String!){
    createUser(input:{
      email:$email
      firstname:""
      lastname:""
      password:$password
      profilephotourl: ""
      backgroundphotourl: ""
      headline: ""
      pronouns:""
      profilelink:""
      about: ""
      location:""
      isactive: true
    }){id}
  }
  `