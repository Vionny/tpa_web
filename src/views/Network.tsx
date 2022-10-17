import { Navigate } from "react-router-dom"

export const NetworkPage = ()=>{
    if (localStorage.getItem("userid")==undefined||localStorage.getItem("userid")=="") return <Navigate to="/"/>
    return <div>Network Page</div>
}