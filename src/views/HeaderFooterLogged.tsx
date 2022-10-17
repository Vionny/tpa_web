import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ThemeContext, widthContext } from "../App"
import { useQuery } from '@apollo/client';
import { getUser } from '../controller/query/userQuery';


export const NavBarHome = () =>{
    const id=JSON.parse(localStorage.getItem("userid")||"")
    const {loading,data,error} = useQuery(getUser,{variables: {id:id}});
    let user
    if(loading == false){
        user = data.getCurrentUser
        console.log(user)
    }
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
    if(loading==false){
    return (
    <div className='t-0 sbg p-0 z-4 w-100'>
            <div className="navbar-home justify-between flex justify-between">
                <div className="search sbg">
                    <ul>
                        <li><img  className="logo-in im" src="https://iconape.com/wp-content/files/yd/367773/svg/logo-linkedin-logo-icon-png-svg.png" onClick={()=>{
                            navigateTo('/')
                        }}></img></li>
                        <li className="searching"><div><button><img src="https://cdn.icon-icons.com/icons2/2066/PNG/512/search_icon_125165.png"></img></button><input type="text" placeholder="Search"></input></div></li>
                        
                    </ul>
                    
                </div>
                <div className="navbar-icons">
                    <ul>
                        <li><button onClick={()=>{
                            localStorage.removeItem('userid')
                            navigateTo('/')
                        }}>Logout</button></li>
                    <li><div><img src="https://cdn-icons-png.flaticon.com/512/25/25694.png"></img>Home</div></li>
                    <li><div><img src="https://cdn-icons-png.flaticon.com/512/33/33308.png"></img>My Network</div></li>
                    <li><div><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Suitcase_icon.svg/1280px-Suitcase_icon.svg.png"></img>Jobs</div></li>
                    <li><div><img src="https://cdn-icons-png.flaticon.com/512/1004/1004017.png"></img>Messaging</div></li>
                    <li><div><img src="https://cdn-icons-png.flaticon.com/512/565/565422.png"></img>Notifications</div></li>
                    <li><div>
                        
                        <img src={user.profilephotourl} className="profile dropbtn"></img><Link className="profile dropbtn" to={'/profile/'+id}>Me</Link>
                        </div></li>
                    </ul>
                </div>
            </div>
    </div>
    )   
    }
    return <div></div>
}

export const FooterHome = () =>{
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
    
    return<div className='navbar-login-register2 sbg'>
            <ul>
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
}

export const FooterHomeSticky = () =>{
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
    return<div className='navbar-login-register3 sbg'>
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
}