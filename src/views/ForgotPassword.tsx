import { useMutation, useQuery } from "@apollo/client"
import { useContext, useState } from "react"
import { Link, Navigate, NavLink, useNavigate, useParams } from "react-router-dom"
import { ThemeContext, widthContext } from "../App"
import { changePass, getResetID, reset_password } from '../controller/query/userQuery';




export const ForgotPasswordPage = ()=>{
    if (!(localStorage.getItem("userid")==undefined||localStorage.getItem("userid")=="")) return <Navigate to={'/home/'+localStorage.getItem('userid')}/>
    const {width, setWidth} = useContext(widthContext)
    const {currTheme,setCurrTheme} = useContext(ThemeContext)
    const [emailInput,setEmailInput] = useState("")
    const [err,setErr] = useState("")
    const navigateTo = useNavigate()
    const [ResetPasswordQuery] = useMutation(reset_password)

    if(currTheme === "dark"){
        document.body.style.backgroundColor = "#5c5c5c";
    } else {
        document.body.style.backgroundColor = "#FFFFFF";
    }
    function handleForgotPassword(){
        if(emailInput===""){
            setErr("Please fill in the blank")
            return;
        }else if(!emailInput.includes('@')){
            setErr("Please input a valid email address")
            return;
        }
        ResetPasswordQuery({variables : {email: emailInput}}).then((data)=>{
           setErr("Reset Password Email has been sent")
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
        <div className="below-navbar-login-register ">
            <div className="login-box">
                <div className="sign">
                    <h2>Forgot password ?</h2>
                    <p>Reset Password in two quick steps</p>
                </div>
                <div className="input-login-styling">
                    <input className="text-center" onChange={(e)=>{setEmailInput(e.target.value)}} type="text" placeholder="Email"></input>
                </div>
                <div><p className="err">{err}</p></div>
                <div className="login-register-button">
                    <button onClick={handleForgotPassword}>Reset Password</button>
                </div>
                <div className="login-register-button">
                    <button className="bt2" onClick={()=>{navigateTo('/')}}><div><p>Back</p></div></button>
                </div>
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

export const ResetPassword = () =>{
    const {width, setWidth} = useContext(widthContext)
    const {currTheme,setCurrTheme} = useContext(ThemeContext)
    if (!(localStorage.getItem("userid")==undefined||localStorage.getItem("userid")=="")) return <Navigate to={"/home/"+localStorage.getItem("userid")?.toString()}/>
    var resetid = useParams()
    if (resetid.reset_id==undefined||resetid.reset_id=="") return <Navigate to="/"/>
    const {loading,data,error} = useQuery(getResetID,{variables: {reset_id:resetid.reset_id}});
    let userid: { toString: () => any; }
    if(loading == false){
        console.log(resetid)
        console.log(data.getResetID.id)
        if(data.getResetID.id!= undefined||data.getResetID.id!= ""){
            <Navigate to = "/"/>
        }
        userid = data.getResetID.id
        // console.log(userid)
    }
    const [pass,setPass] = useState("")
    const [pass2,setPass2] = useState("")
    const [err,setErr] = useState("")
    const navigateTo = useNavigate()
    const [ChangePasswordQuery] = useMutation(changePass)
    if(currTheme === "dark"){
        document.body.style.backgroundColor = "#5c5c5c";
    } else {
        document.body.style.backgroundColor = "#FFFFFF";
    }
    
    function handleReset(){
        if(pass==""|| pass2==""){
            setErr("Please fill all the fields")
            return;
        }
        else if(!(pass == pass2)){
            setErr("Password and confirm password is not the same")
            return;
        }
        ChangePasswordQuery({variables : {id:userid.toString(), password:pass}}).then((data)=>{
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
        <div className="below-navbar-login-register ">
            <div className="login-box">
                <div className="sign">
                    <h2>Reset Password</h2>
                    <p>Password</p>
                </div>
                <div className="input-login-styling">
                    <input className="text-center" onChange={(e)=>{setPass(e.target.value)}} type="password"></input>
                </div>
                <div className="sign">
                    <p>Confirm Password</p>
                </div>
                <div className="input-login-styling">
                    <input className="text-center" onChange={(e)=>{setPass2(e.target.value)}} type="password" ></input>
                </div>
                <div><p className="err">{err}</p></div>
                <div className="login-register-button">
                    <button onClick={handleReset}>Reset Password</button>
                </div>
                <div className="login-register-button">
                    <button className="bt2" onClick={()=>{navigateTo('/')}}><div><p>Back</p></div></button>
                </div>
            </div>
        </div>
        
        
    </div>
}