import { gql } from "@apollo/client";

export const getAllPosts = gql`query getPosts($limit : Int!, $offset:Int!){
  getAllPosts(Limit: $limit, Offset : $offset){
    id
    userid
    text
    link
    type
    like
    share
  }
}`

export const setBgPic=gql`mutation editBgPic($id:ID!, $url :String!){
  setBackgroundPic(id : $id, url : $url){
    id
  }
}`
export const setProfilePic = gql`mutation editProfilePic($id:ID!, $url :String!){
  setProfilePic(id : $id, url : $url) {
    id
  }
}`

export const getUserExperience = gql`query getexpid($userID: ID!){
  getUserExperience (id: $userID) {
  id
  userID
    title
  type
  company
  country
  isActive
  startYear
  endYear
  }
}  `

export const addExperience = gql`mutation createexperience (
      $userID: ID!
      $title: String!
      $type: String!
      $company: String!
      $country: String!
      $isActive: Boolean!
      $startYear: Int!
      $endYear: Int!
    ) {
    createExperience(input :
    {
    userID:$userID,
      title:$title,
    type :$type,
    company:$company,
    country:$country,
    isActive:$isActive,
    startYear:$startYear,
    endYear :$endYear
    }){id}
    }
`

export const addEducation = gql `
mutation newedu($userId: ID!, $institution: String!, $degree: String!, $field: String!, $grade: Float!, $isActive: Boolean!, $startYear: Int!, $endYear: Int!, $activities: String!, $desc: String!) {
  createEducation(input: {
      userID: $userId
      institution: $institution
      degree: $degree
      field: $field
      grade: $grade
      isActive: $isActive
      startYear: $startYear
      endYear: $endYear
      activities: $activities
      desc: $desc
  }) {
      id
      userID
      institution
      degree
      field
      grade
      isActive
      startYear
      endYear
      activities
      desc
  }
}
`

export const getUserEducation = gql`
query eduuserid($userID: ID!){
  getUserEducation (id: $userID) {
  id
  userID
  institution
  degree
  field
  grade
  isActive
  startYear
  endYear
  activities
  desc
  }
}    
`

export const changePass = gql`mutation changePass($id : ID!, $password:String!) {
  changePassword(id:$id, password: $password) {
    id
    }
}`

export const getResetID = gql`query getResetID($reset_id: String!){
  getResetID(reset_id :$reset_id){
  	id
  }
}`

export const reset_password = gql` mutation resetpass($email: String!) {
  forgotPassword(email: $email) {
        id
        email
        reset_id
    }
}`

export const createPost= gql`mutation createPost($userid:ID!,$text:String!,$link:String!,$type:String!){
  createPost(input:{
    userid: $userid,
    text :$text,
    link: $link,
    type: $type
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

export const googleHandle = gql`mutation googleRegister ($email:String!,$firstname:String!,$lastname:String!
  , $profilephotourl:String!){
  googleUser(input:{
    email:$email
    firstname:$firstname
    lastname:$lastname
    password:""
    profilephotourl: $profilephotourl
    backgroundphotourl: ""
    headline: ""
    pronouns:""
    profilelink:""
    about: ""
    location:""
    isactive: true
  }){id}
}`