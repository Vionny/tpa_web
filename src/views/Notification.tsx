import { Navigate } from "react-router-dom"

export const NotifPage = () =>{
    if (localStorage.getItem("userid")==undefined||localStorage.getItem("userid")=="") return <Navigate to="/"/>
    return <div>Notification Page</div>

}