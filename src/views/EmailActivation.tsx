import { useContext } from "react"
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ThemeContext, widthContext } from "../App"
import { FooterHome } from "./HeaderFooterLogged"
import { useMutation } from '@apollo/client';
import { activate } from "../controller/query/userQuery";


export const EmailActivation :React.FC<{}>=({})=>{
    const {width, setWidth} = useContext(widthContext)
    const {currTheme,setCurrTheme} = useContext(ThemeContext)
    const {userid} = useParams()
    const [ActivateEmail]=useMutation(activate);
    const navigateTo = useNavigate();

    ActivateEmail({variables:{id: userid}}).then(()=>{
        navigateTo("/");
    }).catch((err)=>{
        console.log(err);
    })

    return <div className={currTheme}>
        <div className='navbar-login-register sbg'>
            <ul>
                <li><img   className="logo-linked im" src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Wordmark-Black-Logo.wine.svg" ></img></li>
                <li className="theme-icon"><img onClick={() => {currTheme === "light" ?setCurrTheme('dark'): setCurrTheme('light') }} className ='im' src="https://www.iconpacks.net/icons/2/free-sun-icon-3337-thumb.png" ></img></li>
            </ul>
        </div>
        <div className="below-navbar-login-register">
            <div className="login-box">
                <h1>Email Activation</h1>
                <p>Your Email Has Been Activated</p>
            </div>
        </div>
        <FooterHome/>
    </div>
}