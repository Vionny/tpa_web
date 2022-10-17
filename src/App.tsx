import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { LoginPage } from './views/Login'
import { RegisterPage } from './views/Register'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import './scss/css-library.scss'
import './scss/login.scss'
import './scss/theme.scss'
import './scss/modal.scss'
import './scss/post.scss'
import './scss/profile.scss'
import { ForgotPasswordPage, ResetPassword } from './views/ForgotPassword'
import { HomePage } from './views/Home';
import { NavBarHome } from './views/HeaderFooterLogged';
import { EmailActivation } from './views/EmailActivation';
import { ProfilePage } from './views/Profile';
import LogoutPage from './views/Logout';
import { JobPage } from './views/Jobs';
import { MessagePage } from './views/Messaging';
import { NetworkPage } from './views/Network';
import { NotifPage } from './views/Notification';
import { SearchPage } from './views/Search';
export const ThemeContext = createContext<any>({theme: "light"});
export const widthContext = createContext<any>({})
export const userContext = createContext<any>({userid : ""})

function App() {
    const [width, setWidth] = useState(0)
    const [currTheme, setCurrTheme] = useState('light')
    const [userid,setUserID]=useState('')
    

    useEffect(() => {
          updateWidth()
          window.addEventListener("resize", updateWidth)
          return () => window.removeEventListener("resize", updateWidth)
      }, [])

    const updateWidth = () => {
        setWidth(window.innerWidth)
    }
    useEffect(() =>{
      if(localStorage.getItem("theme")!= undefined){
        setCurrTheme(localStorage.getItem("theme")|| "light")
      }
      if(currTheme === "dark"){
          document.body.style.backgroundColor = "#5c5c5c";
      } else {
          document.body.style.backgroundColor = "#FFFFFF";
      }
    })
  
  const client = new ApolloClient({
    uri: 'http://localhost:8080/query',
    cache: new InMemoryCache(),
  });
  
  return (
    <ApolloProvider client={client}>
      <userContext.Provider value = {{userid,setUserID}}>
        <ThemeContext.Provider value={{currTheme,setCurrTheme}}>
          <widthContext.Provider value={{width,setWidth}}>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={
                  <LoginPage/>}/>
                <Route path='/register' element={ localStorage.getItem("userid")==undefined||""?<RegisterPage/>:<Navigate to={'/home/'+localStorage.getItem("userid")}/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordPage/>}></Route>
                <Route path="/reset-password/:reset_id" element={<ResetPassword/>}></Route>
                
                <Route path="/home/:id" element={
                  <HomePage/>
                }></Route>
              
                <Route path="/activate-account/:userid" element={<EmailActivation/>}></Route>
                <Route path="/profile/:id" element={
                  localStorage.getItem("userid")==undefined?
                  <Navigate to="/"/>:<ProfilePage/>}></Route>
                  <Route path='/logout' element={<LogoutPage/>}></Route>
                <Route path="/jobs/:id" element={<JobPage/>}></Route>
                <Route path ="/message/:id" element={<MessagePage/>}></Route>
                <Route path="/network/:id" element={<NetworkPage/>}></Route>
                <Route path="/notification/:id" element = {<NotifPage/>}></Route>
                <Route path="/search/:src" element={<SearchPage/>}></Route>
              </Routes>
            </BrowserRouter>
          </widthContext.Provider>
        </ThemeContext.Provider>
      </userContext.Provider>
    </ApolloProvider>
  )
}



export default App
