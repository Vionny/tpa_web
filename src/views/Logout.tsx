import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LogoutPage(){
    const [width, setWidth] = useState(0)
    useEffect(() => {
        updateWidth()
        window.addEventListener("resize", updateWidth)
        return () => window.removeEventListener("resize", updateWidth)
    }, [])

    const updateWidth = () => {
        setWidth(window.innerWidth)
        // console.log(window.innerWidth)
    }
    const [msg, setMsg] = useState('')
    // console.log(user)
    const navigateTo = useNavigate()

    return(
        <div>
            <div className='navbar-login-register sbg'>
            <ul>
                <li><img   className="logo-linked im" src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Wordmark-Black-Logo.wine.svg" ></img></li>
                
            </ul>
        </div>
        <div className="below-navbar-login-register ">
            <div className="login-box">
                <div className="sign">
                    <h2>Logged Out</h2>
                    <p>You have been logged out</p>
                    <button onClick={()=>{
                        navigateTo('/')
                    }}>Go to Login</button>
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
        </div>
    )
}