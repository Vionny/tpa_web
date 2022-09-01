import { useContext, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { ThemeContext, widthContext } from "../App"




export const ForgotPasswordPage = ()=>{
    const {width, setWidth} = useContext(widthContext)
    const {currTheme,setCurrTheme} = useContext(ThemeContext)
    let emailInput
    let passInput
    const navigateTo = useNavigate()
    if(currTheme === "dark"){
        document.body.style.backgroundColor = "#5c5c5c";
    } else {
        document.body.style.backgroundColor = "#FFFFFF";
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
                    <input className="text-center" onChange={emailInput} type="text" placeholder="Email or Phone"></input>
                </div>
                <div className="login-register-button">
                    <button >Reset Password</button>
                </div>
                <div className="login-register-button">
                    <button className="bt2" onClick={()=>{navigateTo('/')}}><div><p>Back</p></div></button>
                </div>
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

export const ResetPassword = () =>{
    const {width, setWidth} = useContext(widthContext)
    const {currTheme,setCurrTheme} = useContext(ThemeContext)
    let emailInput
    let passInput
    const navigateTo = useNavigate()
    if(currTheme === "dark"){
        document.body.style.backgroundColor = "#5c5c5c";
    } else {
        document.body.style.backgroundColor = "#FFFFFF";
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
                    <p>Password</p>
                </div>
                <div className="input-login-styling">
                    <input className="text-center" onChange={emailInput} type="password"></input>
                </div>
                <div className="sign">
                    <p>Confirm Password</p>
                </div>
                <div className="input-login-styling">
                    <input className="text-center" onChange={emailInput} type="password" ></input>
                </div>
                <div className="login-register-button">
                    <button >Reset Password</button>
                </div>
                <div className="login-register-button">
                    <button className="bt2" onClick={()=>{navigateTo('/')}}><div><p>Back</p></div></button>
                </div>
            </div>
        </div>
        
        
    </div>
}