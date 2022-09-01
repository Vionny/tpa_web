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

    if(currTheme === "dark"){
        document.body.style.backgroundColor = "#5c5c5c";
    } else {
        document.body.style.backgroundColor = "#FFFFFF";
    }
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
            localStorage.setItem('userid',JSON.stringify(data.data.login.id))
            navigateTo('/home')

        })
    }
    
    return <div className={currTheme}>
        <div className='navbar-login-register sbg'>
            <ul>
                <li><img   className="logo-linked im" src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Wordmark-Black-Logo.wine.svg" ></img></li>
                <li className="theme-icon"><img onClick={() => {currTheme === "light" ?setCurrTheme('dark'): setCurrTheme('light') }} className ='im' src="https://www.iconpacks.net/icons/2/free-sun-icon-3337-thumb.png" ></img></li>
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
                <li>User Agreement</li>
                <li>Privacy Policy</li>
                <li>Community Guidelines</li>
                <li>Cookie Policy</li>
                <li>Copyright Policy</li>
                <li>Send Feedback</li>
                <li>Language</li>
            </ul>
        </div>
        
    </div>
}