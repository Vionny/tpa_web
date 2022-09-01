import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { LoginPage } from './views/Login'
import { RegisterPage } from './views/Register'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import './scss/css-library.scss'
import './scss/login.scss'
import './scss/theme.scss'
import { ForgotPasswordPage, ResetPassword } from './views/ForgotPassword'
import { HomePage } from './views/Home';
import { NavBarHome } from './views/HeaderFooterLogged';
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
                <Route path='/' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordPage/>}></Route>
                <Route path="/reset-password" element={<ResetPassword/>}></Route>
                <Route path="/home" element={<HomePage/>}></Route>
              </Routes>
            </BrowserRouter>
          </widthContext.Provider>
        </ThemeContext.Provider>
      </userContext.Provider>
    </ApolloProvider>
  )
}



export default App
