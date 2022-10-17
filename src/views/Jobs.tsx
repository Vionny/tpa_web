import { Navigate } from 'react-router-dom';
export const JobPage = ()=>{
    if (localStorage.getItem("userid")==undefined||localStorage.getItem("userid")=="") return <Navigate to="/"/>
    return <div>Jobs</div>
}