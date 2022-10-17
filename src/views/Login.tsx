import { useMutation } from "@apollo/client"
import { useContext, useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { ThemeContext, widthContext } from "../App"
import { login, register, googleHandle } from '../controller/query/userQuery';
import {GoogleLogin} from 'react-google-login';

const clientId = "216861969721-gi6c5mose38ebuk6k2ha61bvto35ha8k.apps.googleusercontent.com"


export const LoginPage = ()=>{
    const googleId = window.google?.accounts.id
    if (!(localStorage.getItem("userid")==undefined||localStorage.getItem("userid")=="")) return <Navigate to={'/home/'+localStorage.getItem('userid')}/>
    const [loading, setLoading] = useState('Loading...');
    const {width, setWidth} = useContext(widthContext)
    const {currTheme,setCurrTheme} = useContext(ThemeContext)
    const [LoginQuery]=useMutation(login)
    const [emailInput,setEmailInput] = useState("")
    const [passInput,setPassInput] = useState("")
    const [err,setErr] = useState("")
    const [GoogleQuery]=useMutation(googleHandle)
    let navigateTo = useNavigate()
    
    function ParseJwt (token : string) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      
        return JSON.parse(jsonPayload);
      };

    function loginUser(){
        // console.log(emailInput,passInput)
        if(emailInput===""||passInput===""){
            setErr("Please fill in the blank")
            return;
        }
        LoginQuery({variables : {email: emailInput,password : passInput}}).then((data)=>{
            // console.log(data.data.login.id)
            if(data.data.login.id==''){
                setErr("Invalid credentials")
                return;
            }
            localStorage.setItem('userid',JSON.stringify(data.data.login.id.toString().replaceAll('"', '')))
            console.log("go")
            navigateTo('/home/'+data.data.login.id.toString())
        })
        
    }
    function handleCallbackResponse(response : any){
        // console.log("Encoded JWT ID token : " + response)
        // console.log(ParseJwt(response.credential as string))
        var googleUser = ParseJwt(response.credential as string)
        console.log(googleUser)
        // console.log(googleUser.email)
        GoogleQuery({variables : {email: googleUser.email,password : "",firstname:googleUser.given_name,lastname:googleUser.family_name,profilephotourl : googleUser.picture}}).then((data)=>{
            console.log(data)
            localStorage.setItem('userid',JSON.stringify(data.data.googleUser.id.toString()))
            navigateTo('/home/'+JSON.stringify(data.data.googleUser.id.toString()))

        }).catch((err)=>{
            console.log("IN ccatch")
            console.log(err)

            setErr(err.message)
        })
        
    }
  
      useEffect(() =>{
        /* global google*/
        google.accounts.id.initialize({
          client_id : "216861969721-gi6c5mose38ebuk6k2ha61bvto35ha8k.apps.googleusercontent.com",
          callback : handleCallbackResponse
        })
        google.accounts.id.renderButton(
          document.getElementById('signInDiv'),{
            theme:"outline",size:"large"
          }
        )
      },[])

    return <div className={currTheme}>
        <div className='navbar-login-register sbg'>
            <ul>
                <li><img   className="logo-linked im" src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Wordmark-Black-Logo.wine.svg" ></img></li>
                <li className="theme-icon"><img onClick={() => {
                    if(currTheme === "light"){
                        setCurrTheme('dark'),
                        localStorage.setItem("theme","dark")
                    }else{
                        setCurrTheme('light') 
                        localStorage.setItem("theme","light")
                    } }} className ='im' src="https://www.iconpacks.net/icons/2/free-sun-icon-3337-thumb.png" ></img></li>
            </ul>
        </div>
        <div className="below-navbar-login-register ">
            <div className="login-box">
                <div className="sign">
                    <h2>Sign In</h2>
                    <p>Stay updated on your professional life</p>
                </div>
                <div className="input-login-styling">
                    <input className="text-center" onChange={(e)=>{setEmailInput(e.target.value)}} type="text" placeholder="Email"></input>
                    <input className="text-center" onChange={(e)=>{setPassInput(e.target.value)}} type="password" placeholder="Password"></input>
                </div>
                <div><p className="err">{err}</p></div>
                <div className="forgot-password" ><Link to="/forgot-password" className="links">Forgot Password ?</Link></div>
                <div className="login-register-button">
                    <button onClick={()=>{loginUser()}}>Sign in</button>
                </div>
                <p className="or">or</p>
                <div className="login-register-button">
                    {/* <button className="bt2"><div><img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"></img><p>Sign in with Google</p></div></button> */}
                    <div id="signInButton">
                    
                        <div id="signInDiv"></div>
                    </div>
                </div>
            </div>
            <div className="register-now">
                <p>New to LinkedIn ?</p><Link className="links"to="/register">Join Now</Link>
            </div>
        </div>
        <div className='navbar-login-register2 sbg'>
            <ul>
            <li><img   className="logo-linked im" src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Wordmark-Black-Logo.wine.svg" ></img><li>© 2022</li></li>
                <a  href="https://www.linkedin.com/legal/user-agreement?trk=homepage-basic_footer-user-agreement"><li className="link-fixed">User Agreement</li></a>
                <a href="https://www.linkedin.com/legal/privacy-policy"><li  className="link-fixed">Privacy Policy</li></a>
                <li  className="link-fixed"><a href="https://www.linkedin.com/legal/professional-community-policies?trk=homepage-basic_footer-community-guide">Community Guidelines</a></li>
                <li  className="link-fixed">
                    <a href="https://www.linkedin.com/legal/cookie-policy?trk=homepage-basic_footer-cookie-policy">Cookie Policy</a></li>
                <li className="link-fixed">
                <a href="https://www.linkedin.com/legal/copyright-policy?trk=homepage-basic_footer-copyright-policy">Copyright Policy</a></li>
                <li className="link-fixed">
                    <a href="https://www.linkedin.com/help/linkedin/answer/a529150/provide-feedback-on-linkedin-search-results?lang=en">Send Feedback</a></li>
                <li>Language</li>
            </ul>
        </div>
        
    </div>
}