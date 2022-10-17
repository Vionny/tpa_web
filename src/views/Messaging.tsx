import { Navigate } from "react-router-dom"


export const MessagePage = ()=>{
    if (localStorage.getItem("userid")==undefined||localStorage.getItem("userid")=="") return <Navigate to="/"/>
    return <div>MessagePage</div>
}