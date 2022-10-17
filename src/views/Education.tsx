import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getUserEducation, addEducation } from '../controller/query/userQuery';
// import { EduCard } from "./Edu";

interface IAddEducationProps {
    id:string
}

export const AddEducation= (props: IAddEducationProps)=>{
    

    const [institution, setInstitution] = useState('')
    const [degree, setDegree] = useState('')
    const [field, setField] = useState('')
    const [grade, setGrade] = useState(0.0)
    const [start, setStart] = useState(2021)
    const [end, setEnd] = useState(2022)
    const [active, setActive] = useState(false)
    const [activities, setActivities] = useState('')
    const [desc, setDesc] = useState('')
    const [openNew, setOpenNew] = useState(false)
    const navigateTo = useNavigate()
    const userid = localStorage.getItem('userid')
    const [errortxt, setErrorTxt] = useState('')
    const [width, setWidth] = useState(0)
    useEffect(() => {
        updateWidth()
        window.addEventListener("resize", updateWidth)
        return () => window.removeEventListener("resize", updateWidth)
    }, [])
    const updateWidth = () => {
        setWidth(window.innerWidth)
        // console.log(window.innerWidth)
    }
    const {loading, error, data, refetch} = useQuery(getUserEducation, {variables: {userID: userid?.replace('"',"").replace('\"',"")}})
    // console.log(data)
    const [addEdu] = useMutation(addEducation, {
        variables: {
            userId: userid?.replace('\"',"").replace('"',""),
            institution: institution,
            degree: degree,
            field: field,
            grade: grade,
            isActive: active,
            startYear: start,
            endYear: end,
            activities: activities,
            desc: desc
        }
    })

    function goAdd(e: { preventDefault: () => void; }){
        e.preventDefault()
        // console.log({
        //     userId: userid?.replace('\"',""),
        //     institution: institution,
        //     degree: degree,
        //     field: field,
        //     grade: grade,
        //     isActive: active,
        //     startYear: start,
        //     endYear: end,
        //     activities: activities,
        //     desc: desc
        // })
        if (institution == '') {
            setErrorTxt('Institution must not be empty.')
            return
        } else if (degree == '') {
            setErrorTxt('Degree must not be empty.')
            return
        } else if (field == '') {
            setErrorTxt('Field must not be empty.')
            return
        } else if (!start) {
            setErrorTxt('Start year must not be empty.')
            return
        } else if (!end) {
            setErrorTxt('End year must not be empty.')
            return
        } else if (start > end){
            setErrorTxt('End year must not be before start year.')
            return
        }

        addEdu().then((x)=>{
            // console.log(x)
            setErrorTxt('')
            refetch()
            // setOpenNew(!openNew)
            navigateTo('/profile/'+props.id.replace('"',""))
        }).catch((m)=>{
            setErrorTxt(m.message)
            // console.log("out: " + m.message)
        })
    }
    
    if(!loading){
    return<div><div className="flex flex-col items-start bg-white rounded-md border-semitrans p-8 my-4">
            <div className="w-full my-2">
                    <div className="flex flex-col bg-white2 rounded-md py-3 my-2 w-full">
                        <input type="text" placeholder="Institution" title="Institution" className={`text-input mx-3 my-2 ${width>1000 ? 'w-half' : 'w-threefourth'}`} required onChange={e=> setInstitution(e.target.value)}/>
                        <input type="text" placeholder="Degree" title="Degree" className={`text-input mx-3 my-2 ${width>1000 ? 'w-half' : 'w-threefourth'}`} required onChange={e=> setDegree(e.target.value)}/>
                        <input type="text" placeholder="Field" title="Field" className={`text-input mx-3 my-2 ${width>1000 ? 'w-half' : 'w-threefourth'}`} required onChange={e=> setField(e.target.value)}/>
                        <input type="number" placeholder="Grade" title="Grade" step=".01" className={`text-input mx-3 my-2 ${width>1000 ? 'w-half' : 'w-threefourth'}`} required onChange={(e)=> {
                            setGrade(parseFloat(e.target.value))}
                            }/>
                        <div className="flex flex-row mx-3 my-2">
                            <input type="number" name="start" id="start" placeholder="Start Year" title="Start Year" className={`text-input w-20`} required onChange={(e)=> setStart(parseInt( e.target.value))}/>
                            <h4 className="p-1 m-0 font-normal mx-3">until</h4>
                            <input type="number" name="end" id="end" placeholder="End Year" title="End Year" className={`text-input w-20`} required onChange={e=> setEnd(parseInt( e.target.value))}/>
                            <div className="mt-1 ml-3 mr-4">
                                <input type="checkbox" name="active" id="active" placeholder="Active" onChange={e=> setActive(e.target.checked)}/>
                                <label htmlFor="active" className="mt-1">Currently Active</label>
                            </div>
                        </div>
                        <input type="text" placeholder="Activities" title="Activities" className={`text-input mx-3 my-2 ${width>1000 ? 'w-half' : 'w-threefourth'}`} required onChange={e=> setActivities(e.target.value)}/>
                        <input type="text" placeholder="Description" title="Description" className={`text-input mx-3 my-2 ${width>1000 ? 'w-half' : 'w-threefourth'}`} required onChange={e=> setDesc(e.target.value)}/>
                        
                        <div className="ml-3 my-1 text-left text-secondary">{errortxt}</div>
                        <div className="flex flex-row ml-3">
                            <div className='bg-primary-adv border-primary rounded-md px-2 button-text-white py-1 my-2 mr-3 text-sm text-center hand w-onefourth' onClick={goAdd}>Add Experience</div>
                        </div>
                    </div>
                
            </div>

        </div>
        {data.getUserEducation.map((edu: any) => {
            return(
            <div className="flex flex-row ">
                <p>akdsfjldsajflkdsaj</p>
            <div className="profile-inner-container bg  mt-5 pb-2 px-2 pr-2 w-97">
                <div className="flex-row inline-flex justify-between w-100 p-2">
                    <p className="text-lg w-fit m-0 mt-4"><b></b></p>
                    <button className="flex mt-4 button-plus m-5">+</button>
                </div>
                <div className="inline-flex w-100 p-2 mb-2">
                    <p className="w-fit m-0 mt-4 mr-4"><b>{edu.institution}</b> </p>
                    <p className="w-fit m-0 mt-4 mr-4"><b>{edu.degree}</b> - </p>
                    <p className="w-fit m-0 mt-4 mr-4"><b>{edu.field}</b>  - </p>
                    <p className="w-fit m-0 mt-4 mr-4"><b>{edu.grade}</b></p>
                </div>
                <p className="px-2">{edu.isactive}</p>
                <p className="px-2">{edu.activities}</p>
                <p className="px-2">{edu.desc}</p>
                <p className="px-2">{edu.startYear} - {edu.endYear}</p>
          </div>
            
            </div>
            )
            
        })}
            {/* <div className="profile-inner-container bg  mt-5 pb-2 px-2 pr-2 w-97">
                <div className="flex-row inline-flex justify-between w-100 p-2">
                    <p className="text-lg w-fit m-0 mt-4"><b>Change to db</b></p>
                    <button className="flex mt-4 button-plus m-5">+</button>
                </div>
                <div className="flex-row inline-flex w-100 p-2 mb-2">
                    <p className="w-fit m-0 mt-4 mr-4"><b>Company DB</b></p>
                    <p className="w-fit m-0 mt-4 mr-4"><b>Country DB</b></p>
                    <p className="w-fit m-0 mt-4 mr-4"><b>Position DB</b></p>
                </div>
                <p className="px-2">Start - End Work</p>
        </div> */}
    </div>
    }
}