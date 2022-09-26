import { gql } from "@apollo/client";

export const createPost= gql`mutation createPost($userid:ID!,$text:String!,$link:String!){
  createPost(input:{
    userid: $userid,
    text :$text,
    link: $link
  }){id}
}`

export const getUser = gql `query getUser($id:ID!){
  getCurrentUser(id :$id){
  	id
    email
    firstname,
    lastname,
    profilephotourl,
    backgroundphotourl,
    headline,
    pronouns,
    profilelink,
    about,
    location,
    isactive,
  }
}`

export const activate= gql`mutation setActive($id:ID!){
  activateAccount(id:$id){
    isactive
  }
}`

export const login=gql`mutation loginUser($email:String!,$password:String!){
    login(email:$email,password:$password)
    {id}}`

export const register = gql`mutation register ($email:String!,$password:String!,$lastname:String!,$firstname:String!){
    createUser(input:{
      email:$email
      firstname:$firstname
      lastname:$lastname
      password:$password
      profilephotourl: ""
      backgroundphotourl: ""
      headline: ""
      pronouns:""
      profilelink:""
      about: ""
      location:""
      isactive: false
    }){id}
  }
  `