import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ThemeContext, widthContext } from "../App"
import { NavBarHome, FooterHome, FooterHomeSticky } from './HeaderFooterLogged'
import '../scss/home.scss'

export const HomePage = () =>{
    const {width, setWidth} = useContext(widthContext)
    const {currTheme,setCurrTheme} = useContext(ThemeContext)
    const {id}=useParams()
    let emailInput
    let passInput
    const navigateTo = useNavigate()
    if(currTheme === "dark"){
        document.body.style.backgroundColor = "#3e3e3e";
    } else {
        document.body.style.backgroundColor = "#eeeeee";
    }
    {console.log(id)}
    return <div className={currTheme}>
        
        <NavBarHome/>
        <div className="below-navbar-login-register sbg2 ">
            <div className="home-page">
                <div className="z-0 ">
                    <div className="home-profile-container">
                        <div className="home-profile sbg">
                                <div className="profile-upper-background ">
                                    <img src="https://d9jhi50qo719s.cloudfront.net/5il/samples/1osk_800.png?220402024834"></img>
                                    <div className="home-profile-picture">
                                        <img src="https://i.pinimg.com/originals/26/8c/2a/268c2a61e262d539e5e90bfa44e5e12d.jpg"></img>
                                    </div>
                                    <div className="center-all mt-2">
                                        <p className="home-profile-name bl">Xiao</p>
                                        <p className="home-profile-place">Student at Institut Teknik Liyue</p>
                                    </div>
                                    <hr className="border mt-2"></hr>
                                </div>
                                <br></br>
                            <div className="profile-below "></div>
                            <div className="justify-between content-text">
                                <p className="sbg">Connections</p>
                                <p>3</p>
                            </div>
                            <div className="justify-between content-text mt-2">
                                <p className="sbg bl"><b>Connect with alumni</b></p>
                                <p></p>
                            </div>
                            <div className="justify-between content-text mt-2">
                                <p className="sbg mb-2">Invitations</p>
                                <p>1</p>
                            </div>
                            <div>
                                <hr className="border mt-2"></hr>
                                <div className="justify-between content-text mt-2">
                                    <p className="sbg text-small">Access exclusive tools & insights</p>
                                    <p></p>
                                </div>
                                <div className="content-text mt-1">
                                    <img src="https://icon-library.com/images/square-icon/square-icon-12.jpg"></img>
                                    <p className="sbg bl mb-2"><b>Try Premium for Free</b></p>
                                </div>
                            </div>
                            <div>
                                <hr className="border mt-2"></hr>
                                <div className="content-text mt-1">
                                    <img src="https://iconvulture.com/wp-content/uploads/2017/12/bookmark-black-shape.svg"></img>
                                    <p className="sbg bl"><b>My Items</b></p>
                                </div>
                            </div>
                        </div>
                        <div className="home-profile2 sbg"></div>
                    </div>
                    <div className="home-right-container sbg">

                    </div>
                </div>
                
                
            </div>
            <div className="home-posts-container sbg">

                </div>
        </div>
        <FooterHomeSticky/>
    </div>
}