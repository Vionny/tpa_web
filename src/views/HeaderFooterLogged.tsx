import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ThemeContext, widthContext } from "../App"


export const NavBarHome = () =>{
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
    
    return (
    <div className=' sbg p-0'>
            <div className="navbar-home justify-between flex justify-between">
                <div className="search sbg">
                    <ul>
                        <li><img  className="logo-in im" src="https://iconape.com/wp-content/files/yd/367773/svg/logo-linkedin-logo-icon-png-svg.png" ></img></li>
                        <li className="searching"><div><button><img src="https://cdn.icon-icons.com/icons2/2066/PNG/512/search_icon_125165.png"></img></button><input type="text" placeholder="Search"></input></div></li>
                    </ul>
                </div>
                <div className="navbar-icons">
                    <ul>
                    <li><div><img src="https://cdn-icons-png.flaticon.com/512/25/25694.png"></img>Home</div></li>
                    <li><div><img src="https://cdn-icons-png.flaticon.com/512/33/33308.png"></img>My Network</div></li>
                    <li><div><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Suitcase_icon.svg/1280px-Suitcase_icon.svg.png"></img>Jobs</div></li>
                    <li><div><img src="https://cdn-icons-png.flaticon.com/512/1004/1004017.png"></img>Messaging</div></li>
                    <li><div><img src="https://cdn-icons-png.flaticon.com/512/565/565422.png"></img>Notifications</div></li>
                    <li><div><img src="https://i.pinimg.com/736x/a7/ba/3f/a7ba3f986ee7af992db650b2cb64eba6.jpg" className="profile"></img>Me</div></li>
                    </ul>
                </div>
            </div>
    </div>
    )   
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
                <li>User Agreement</li>
                <li>Privacy Policy</li>
                <li>Community Guidelines</li>
                <li>Cookie Policy</li>
                <li>Copyright Policy</li>
                <li>Send Feedback</li>
                <li>Language</li>
            </ul>
        </div>
}