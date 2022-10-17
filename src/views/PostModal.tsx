
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, getUser } from '../controller/query/userQuery';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../controller/firebase/FirebaseConfig';
import { AiFillYoutube, AiFillPicture } from 'react-icons/ai'

export const PostModal: React.FC<{setOpen:Function}> = ({setOpen})=>{

    const [postText, setPostText] = useState();
    const userid=JSON.parse(localStorage.getItem("userid")||"")
    const {loading,data,error} = useQuery(getUser,{variables: {id:userid}});
    const [CreatePostQuery] = useMutation(createPost)
    const [text,setText] = useState("")
    const [err,setErr] = useState("")
    const navigateTo = useNavigate()
    const [file, setFile] = useState<File>()
    const [url,setUrl] = useState("")
    let user
    const [removeFileStyle, setRemoveFileStyle] = useState("none")

    const [localUrl, setLocalUrl] = useState({
        type: "",
        url: "",
    })
    if(loading == false){
        user = data.getCurrentUser
        // console.log(user)
    }
    const showRemoveAttachmentFile = () => {
        if (localUrl.url === "") {
            setRemoveFileStyle("none")
        } else {
            setRemoveFileStyle("block")
        }
    }
    const changeFileHandler = (e: any, typeInput: string) => {
        console.log(e)
        const urlFile = URL.createObjectURL(e.target.files[0])
        // setImageFile((e.target.files as FileList)[0] as File)
        let type = e.target.files[0].type
        let splitType = type.split("/");
        console.log(type)
        console.log(splitType)
        if (typeInput === splitType[0]) {
            
            setLocalUrl({
                type: typeInput,
                url: urlFile,
            })
            

            // showRemoveAttachmentFile()
            setFile((e.target.files as FileList)[0] as File)
        }
    }

    function removeFile (){
        setLocalUrl({type:"",url: ""})
        showRemoveAttachmentFile()
        console.log(localUrl.type,localUrl.url)
    }
    async function createHandle(){
        if(text==""){
            setErr("Please fill all the fields")
        }else{
            let url = ""

            if (file !== undefined) {
                const refStorage = ref(storage, `${localStorage.getItem("userid")}/${(file as File).name}`)
                await uploadBytes(refStorage, file as File, { contentType: 'profile pic' })
                url = await getDownloadURL(refStorage)
                console.log(url)
                console.log("test1")
                setUrl(url)
            } else {

            }
            CreatePostQuery({variables:{userid:userid,text:text,link:url, type: localUrl.type}}).then((data)=>{
                console.log(data)
                setOpen(false)
                navigateTo('/home/'+{userid})
            })
            
        }
    }
    
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
                <div className= "mw"> {
                            localUrl.url === "" ?
                                (null)
                                :
                                (
                                    localUrl.type === "image" ?
                                        (
                                            <img src={localUrl.url} alt="" />
                                        )
                                        :
                                        (
                                            <video src={localUrl.url} controls></video>
                                        )
                                )
                        }</div>
                <textarea className="post-text" placeholder="What do you want to talk about ?" onChange={(e)=>{setText(e.target.value)}}></textarea>
                <p>{err}</p>
                <div className="footer">
                    <div className=" flex items-center">
                        <div className='flex items-center'>
                                <label htmlFor="file-input" className='photo'>
                                <AiFillPicture size={30} />
                                </label>
                                <p>Image</p>
                                <input id="file-input" type="file" onChange={(e) => changeFileHandler(e,"image" )} style={{ display: "none" }} />
                            </div>
                            <div className='flex items-center'>
                                <label htmlFor="video-input" className='video'>
                                    <AiFillYoutube size={30} />
                                </label>
                                <p>Video</p>
                                <input id="video-input" type="file" onChange={(e) => {changeFileHandler(e, "video")
                                console.log(localUrl)}
                            } style={{ display: "none" }} />
                            </div>
                        <div className='flex items-center'>
                            <button onClick={() =>{removeFile()} }>Remove File Chosen</button>
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