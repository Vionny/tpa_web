import { useMutation } from "@apollo/client"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ThemeContext, widthContext } from "../App"
import { login } from "../controller/query/userQuery"




export const LoginPage = ()=>{
    const {width, setWidth} = useContext(widthContext)
    const {currTheme,setCurrTheme} = useContext(ThemeContext)
    const [LoginQuery]=useMutation(login)
    const [emailInput,setEmailInput] = useState("")
    const [passInput,setPassInput] = useState("")
    const [err,setErr] = useState("")
    let navigateTo = useNavigate()
    
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
            localStorage.setItem('userid',JSON.stringify(data.data.login.id.toString()))
            navigateTo('/home/')

        })
    }
    
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
                    <button className="bt2"><div><img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"></img><p>Sign in with Google</p></div></button>
                </div>
            </div>
            <div className="register-now">
                <p>New to LinkedIn ?</p><Link className="links"to="/register">Join Now</Link>
            </div>
        </div>
        <div className='navbar-login-register2 sbg'>
            <ul>
                <li><img   className="logo-linked im" src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Wordmark-Black-Logo.wine.svg" ></img><li>© 2022</li></li>
                <Link  to="https://www.linkedin.com/legal/user-agreement?trk=homepage-basic_footer-user-agreement"><li className="link-fixed">User Agreement</li></Link>
                <Link to="https://www.linkedin.com/legal/privacy-policy"><li  className="link-fixed">Privacy Policy</li></Link>
                <Link to="https://www.linkedin.com/legal/professional-community-policies?trk=homepage-basic_footer-community-guide"><li  className="link-fixed">Community Guidelines</li></Link>
                <Link to="https://www.linkedin.com/legal/cookie-policy?trk=homepage-basic_footer-cookie-policy"><li  className="link-fixed">Cookie Policy</li></Link>
                <Link to="https://www.linkedin.com/legal/copyright-policy?trk=homepage-basic_footer-copyright-policy"><li className="link-fixed">Copyright Policy</li></Link>
                <Link to="https://www.linkedin.com/help/linkedin/answer/a529150/provide-feedback-on-linkedin-search-results?lang=en"><li className="link-fixed">Send Feedback</li></Link>
            </ul>
        </div>
        
    </div>
}