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
    const [fn,setFn]= useState("")
    const [ln, setLn]= useState("")
    const [err,setErr] = useState("")
    let navigateTo = useNavigate()
    if(currTheme === "dark"){
        document.body.style.backgroundColor = "#5c5c5c";
    } else {
        document.body.style.backgroundColor = "#FFFFFF";
    }
    function loginUser(){
        // console.log(emailInput,passInput)
        if(emailInput===""||passInput===""||fn===""||ln===""){
            setErr("Please fill in the blank")
            return;
        }
        RegisterQuery({variables : {email: emailInput,password : passInput,firstname:fn,lastname:ln}}).then((data)=>{
            console.log(data)
            navigateTo('/')

        }).catch((err)=>{
            setErr(err.message)
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
        <div className="below-navbar-login-register">
            
            <div className="login-box">
                <div className="flex flex-row f-l">
                    <div className="input-login-styling">
                    <p>First Name</p>
                    <input className="text-center self" onChange={(e)=>{setFn(e.target.value)}}  type="text"></input>
                    </div>
                    <div className="input-login-styling last-n">
                    <p>Last Name</p>
                    <input className="text-center self" onChange={(e)=>{setLn(e.target.value)}}  type="text"></input>
                    </div>
                </div>
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