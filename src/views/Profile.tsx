import { useQuery, useMutation } from '@apollo/client';
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useContext, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { ThemeContext, widthContext } from "../App"
import { getUser, setBgPic, setProfilePic } from '../controller/query/userQuery';
import { NavBarHome, FooterHomeSticky } from './HeaderFooterLogged';
import { AddEducation } from './Education';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Experience } from "./Experience";
import { AiFillPicture, AiFillYoutube } from "react-icons/ai";
import { storage } from "../controller/firebase/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const ProfilePage = ()=>{
    const {currTheme,setCurrTheme} = useContext(ThemeContext)
    const id=useParams()
    const [bgfile, setBGFile] = useState<File>()
    const [ppfile, setPPFile] = useState<File>()
    const {width, setWidth} = useContext(widthContext)

    const [setBGFileQuery] = useMutation(setBgPic)
    const [setPPFileQuery] = useMutation(setProfilePic)
    const navigateTo = useNavigate()
    if(currTheme === "dark"){
        document.body.style.backgroundColor = "#3e3e3e";
    } else {
        document.body.style.backgroundColor = "#eeeeee";
    }
    const [localUrl, setLocalUrl] = useState({
        type: "",
        url: "",
    })
    
    const {loading,data,error} = useQuery(getUser,{variables: {id:id.id}});
    var user :any
    // console.info(localStorage.getItem("userid")?.replaceAll('"', ''))
    // console.info(id)
    const handlePrintToPdf= ()=>  {
        const input = document.getElementById('profile-container-id');
        // const hideModal = document.getElementById('modal-more-container') as HTMLElement
        // hideModal.style.display = 'none'
        const pdf = new jsPDF();
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        html2canvas(input as HTMLElement)
            .then((canvas: { toDataURL: (arg0: string, arg1: number) => any; }) => {
                const imgData = canvas.toDataURL('image/png', 100);

                pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
                // pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
                // pdf.output('dataurlnewwindow');
                pdf.save(`${user.firstname.concat(" ").concat(user.lastname).concat(".pdf")}`);
            });
    }    
    function removeFile (){
        setLocalUrl({type:"",url: ""})
        console.log(localUrl.type,localUrl.url)
    }

    async function updateProfilePic(){
        var _profilePhoto
        var _backgroundPhoto
        if(ppfile != null){
            const refStorage = ref(storage, `${localStorage.getItem("userid")}/${(ppfile as File).name}`)
            await uploadBytes(refStorage, ppfile as File, { contentType: 'profile pic' })
            var ppurl = await getDownloadURL(refStorage)
            setPPFileQuery({variables : {id: id.id?.replace('\"',"").replace('"',""),url : ppurl}})
        }
        if(bgfile != null){
            const refStorage = ref(storage, `${localStorage.getItem("userid")}/${(bgfile as File).name}`)
            await uploadBytes(refStorage, bgfile as File, { contentType: 'profile pic' })
            var bgurl = await getDownloadURL(refStorage)
            setBGFileQuery({variables : {id: id.id?.replace('\"',"").replace('"',""),url : bgurl}})
        }
        navigateTo('/profile/'+id.id)
    }
    if(loading == false){
        // console.log(data)
        user = data.getCurrentUser
        // console.log(user)
        // console.log(user.id)
        // console.log(localStorage.getItem("userid")?.toString().replaceAll('"', ''))
        // console.log(user.id == localStorage.getItem("userid")?.toString().replaceAll('"', ''))
    }
    if(loading == false){
        return <div className={currTheme}  id="profile-container-id">
            <NavBarHome/>
            <div className="container-in-profile">
                <div className="profile-container pt-5" >
                        <div className="profile h-4000 sbg">
                            <div className="profile-upper sbg ">
                                <img src={user.backgroundphotourl} alt="https://d9jhi50qo719s.cloudfront.net/5il/samples/1osk_800.png?220402024834"></img>
                                <div className="profile-profile-picture">
                                    <img src={user.profilephotourl} alt="https://i.pinimg.com/originals/26/8c/2a/268c2a61e262d539e5e90bfa44e5e12d.jpg"></img>
                                </div>
                                <div className="mt-2 px-5">
                                    <p className="bl">{(user.firstname+" "+user.lastname).toString()}</p>
                                        <p className="">{user.headline}</p>
                                </div>
                                <div className="mt-2 px-5">
                                    <button onClick={handlePrintToPdf}>Save to PDF</button>
                                    
                                    <div className=" flex items-center">
                                        <div className='flex items-center'>
                                            <label htmlFor="file-input1" className='photo'>
                                            <AiFillPicture size={30} />
                                            </label>
                                            {(id.id!==undefined&&id.id !=="" && id.id == localStorage.getItem("userid")?.replaceAll('"', ''))?
                                            <p>Background Photo - </p>:<></>}
                                            {(id.id!==undefined&&id.id !=="" && id.id == localStorage.getItem("userid")?.replaceAll('"', ''))?
                                            <p>Current : {bgfile?.name}</p>:<></>}
                                            {(id.id!==undefined&&id.id !=="" && id.id == localStorage.getItem("userid")?.replaceAll('"', ''))?
                                            <input id="file-input1" type="file" onChange={(e) => {setBGFile((e.target.files as FileList)[0])}} style={{ display: "none" }} />:<></>}
                                        </div>
                                        <div className='flex items-center'>
                                            <label htmlFor="file-input2" className='photo'>
                                            <AiFillPicture size={30} />
                                            </label>
                                            {(id.id!==undefined&&id.id !=="" && id.id == localStorage.getItem("userid")?.replaceAll('"', ''))?
                                            <p>Profile Photo - </p>:<></>}
                                            {(id.id!==undefined&&id.id !=="" && id.id == localStorage.getItem("userid")?.replaceAll('"', ''))?
                                            <p>Current : {ppfile?.name}</p>:<></>}
                                            {(id.id!==undefined&&id.id !=="" && id.id == localStorage.getItem("userid")?.replaceAll('"', ''))?
                                            <input id="file-input2" type="file" onChange={(e) => {setPPFile((e.target.files as FileList)[0])}} style={{ display: "none" }} />:<></>}
                                        </div>
                                        {(id.id!==undefined&&id.id !=="" && id.id == localStorage.getItem("userid")?.replaceAll('"', ''))?
                                        <button onClick={updateProfilePic}>Update Profile Photos</button>:<></>}
                                        <div className='flex items-center'>
                                        {(id.id!==undefined&&id.id !=="" && id.id == localStorage.getItem("userid")?.replaceAll('"', ''))?
                                            <button onClick={() =>{removeFile()} }>Remove File Chosen</button>:<></>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                        </div>
                        <div className="skip-up ">
                        <div className="pt-10 h-fit pr-12">
                            <div className="profile-inner-container  sbg px-5 pb-7 pr-7 w-100">
                                <div className="flex-row inline-flex justify-between w-100">
                                    <p className="text-xl w-fit m-0 mt-4"><b>Experiences</b></p>
                                    {((id.id!==undefined&&id.id !=="" &&id.id == localStorage.getItem("userid")?.replaceAll('"', ''))?
                                        <button className="flex mt-4 button-plus">+</button>:<div></div>
                                    )}
                                     
                                </div>
                                
                                {/* Looping  here for experiences */}
                                <div className="profile-inner-container bg  mt-5 pb-2 px-2 pr-2 w-97">
                                {((id.id!==undefined&&id.id !=="" && id.id == localStorage.getItem("userid")?.replaceAll('"', ''))?
                                    (loading==false)?<Experience id={id.id!==undefined ? id.id : ""} />:<div></div>:<div></div>
                                    )}
                                        {/* <div className="flex-row inline-flex justify-between w-100 p-2">
                                            <p className="text-lg w-fit m-0 mt-4"><b>Change to db</b></p>
                                            <button className="flex mt-4 button-plus m-5">+</button>
                                        </div>
                                        <div className="flex-row inline-flex w-100 p-2 mb-2">
                                            <p className="w-fit m-0 mt-4 mr-4"><b>Company DB</b></p>
                                            <p className="w-fit m-0 mt-4 mr-4"><b>Country DB</b></p>
                                            <p className="w-fit m-0 mt-4 mr-4"><b>Position DB</b></p>
                                        </div>
                                        <p className="px-2">Start - End Work</p> */}
                                </div>
                            </div>
                            
                        </div>
                        <div className="pt-10 h-fit pr-12 mb-12">
                            <div className="profile-inner-container sbg px-5 pb-7 pr-7 w-100">
                                <div className="flex-row inline-flex justify-between w-100">
                                    <p className="text-xl w-fit m-0 mt-4"><b>Education</b></p>
                                    {((id.id!==undefined&&id.id !=="" &&id.id == localStorage.getItem("userid")?.replaceAll('"', ''))?
                                        <button className="flex mt-4 button-plus">+</button>:<div></div>
                                    )}
                                </div>
                                <div>
                               
                                    {((id.id!==undefined&&id.id !=="" && id.id == localStorage.getItem("userid")?.replaceAll('"', ''))?
                                    (loading==false)?<AddEducation id={id.id!==undefined ? id.id : ""} />:<div></div>:<div></div>
                                    )}
                                </div>
                                {/* Looping  here for experiences */}
                                
                            </div>
                            
                        </div>
                        </div>
                    </div>
                </div>
               
            <FooterHomeSticky/>
        </div>
    }
}