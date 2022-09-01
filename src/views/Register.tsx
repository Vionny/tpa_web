import { useMutation } from "@apollo/client"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ThemeContext, widthContext } from "../App"
import { register } from "../controller/query/userQuery"

export const RegisterPage = ()=>{

    const {width, setWidth} = useContext(widthContext)
    const {currTheme,setCurrTheme} = useContext(ThemeContext)
    const [RegisterQuery]=useMutation(register)
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
        RegisterQuery({variables : {email: emailInput,password : passInput}}).then((data)=>{
            // console.log(data.data.login.id)
            navigateTo('/')

        }).catch((err)=>{
            setErr(err.message)
        })
    }
    
    return <div className={currTheme}>
        <div className='navbar-login-register sbg'>
            <ul>
                <li><img   className="logo-linked im" src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Wordmark-Black-Logo.wine.svg" ></img></li>
                <li className="theme-icon"><img onClick={() => {currTheme === "light" ?setCurrTheme('dark'): setCurrTheme('light') }} className ='im' src="https://www.iconpacks.net/icons/2/free-sun-icon-3337-thumb.png" ></img></li>
            </ul>
        </div>
        <div className="below-navbar-login-register">
            <div className="login-box">
                
                <div className="input-login-styling">
                    <p>Email</p>
                    <input className="text-center self" onChange={(e)=>{setEmailInput(e.target.value)}}  type="text"></input>
                    <p>Password (6 or more characters) </p>
                    <input className="text-center self" onChange={(e)=>{setPassInput(e.target.value)}}type="password"></input>
                </div>
                <div><p className="err">{err}</p></div>
                <p className="flex flex-row by-clicking">By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy</p>
                <div className="login-register-button">
                    <button onClick={()=>{loginUser()}}>Agree & Join</button>
                </div>
                <p className="or">or</p>
                <div className="login-register-button">
                    <button className="bt2"><div><img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"></img><p>Sign in with Google</p></div></button>
                </div>
                <div className="register-now">
                <p>Already on LinkedIn? </p><Link className="links"to="/">Sign in</Link>
                 </div>
            </div>
            
            <div className="register-now">
                <p>Looking to create a page for a business ?</p><Link className="links"to="/register">Get help</Link>
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