
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, getUser } from '../controller/query/userQuery';

export const PostModal: React.FC<{setOpen:Function}> = ({setOpen})=>{

    const [postText, setPostText] = useState();
    const userid=JSON.parse(localStorage.getItem("userid")||"")
    const {loading,data,error} = useQuery(getUser,{variables: {id:userid}});
    const [CreatePostQuery] = useMutation(createPost)
    const [text,setText] = useState("")
    const [err,setErr] = useState("")
    const navigateTo = useNavigate()
    let user
    if(loading == false){
        user = data.getCurrentUser
        console.log(user)
    }

    function createHandle(){
        if(text==""){
            setErr("Please fill all the fields")
        }else{
            CreatePostQuery({variables:{userid:userid,text:text,link:""}}).then((data)=>{
                console.log(data)
                setOpen(false)
                navigateTo('/home/'+{userid})
            })
            
        }
    }
    // console.log(user)
    if(loading == false){
    return <div className="modal">
            <div className = "create-post-modal ">
                <div className="header">
                    <p className="text" id="title">Create Post</p>
                        <button className="button-close" onClick={()=>{setOpen(false)}}>X</button>
                    </div>
                    <hr />
                <div className="flex items-center create-post-profile-pic w-100" id="header-user">
                    <img id="user-icon" src={user.profilephotourl.toString()} alt="https://i.pinimg.com/originals/26/8c/2a/268c2a61e262d539e5e90bfa44e5e12d.jpg"/>
                    <p className="w-100">{user.firstname + " " + user.lastname}</p>
                </div>

                <textarea className="post-text" placeholder="What do you want to talk about ?" onChange={(e)=>{setText(e.target.value)}}></textarea>
                <p>{err}</p>
                <div className="footer">
                    <div className=" flex items-center">
                        <div className="flex items-center" id="button">
                        <p className="text">Image</p>
                        </div>

                        <div className="flex items-center" id="button">
                        <p className="text">Video</p>
                        </div>
                    </div>
                    
                    <button onClick={()=>{createHandle()}} id="btn-post">Post</button>
                </div>
                
            </div>
        </div>
    }else{
        return <div></div>
    }

}