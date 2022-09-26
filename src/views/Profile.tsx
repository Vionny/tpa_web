import { useContext } from "react"
import { useParams } from "react-router-dom"
import { ThemeContext, widthContext } from "../App"
import { NavBarHome, FooterHomeSticky } from './HeaderFooterLogged';

export const ProfilePage = ()=>{
    const {currTheme,setCurrTheme} = useContext(ThemeContext)
    // const {id}=localStorage.getItem("userid")
    const {width, setWidth} = useContext(widthContext)
    if(currTheme === "dark"){
        document.body.style.backgroundColor = "#3e3e3e";
    } else {
        document.body.style.backgroundColor = "#eeeeee";
    }
    return <div className={currTheme}>
        <div>
        <NavBarHome/>
        </div>
            <div className="profile-container">
                    <div className="profile sbg">
                        <div className="profile-upper">
                            <img src="https://d9jhi50qo719s.cloudfront.net/5il/samples/1osk_800.png?220402024834"></img>
                            <div className="profile-profile-picture">
                                <img src="https://i.pinimg.com/originals/26/8c/2a/268c2a61e262d539e5e90bfa44e5e12d.jpg"></img>
                            </div>
                            <div className=" mt-2">
                                <p className="bl">Xiao</p>
                                    <p className="">Student at Institut Teknik Liyue</p>
                                </div>
                            </div>
                    </div>
            </div>
        <FooterHomeSticky/>
    </div>
}