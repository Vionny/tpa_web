import { useMutation, useQuery } from "@apollo/client"
import { useState } from 'react';
import { addExperience, getUserExperience } from '../controller/query/userQuery';
interface IAddExperienceProps {
    id:string
}
export const Experience = (props: IAddExperienceProps)=>{
    const [errortxt, setErrorTxt] = useState('')
    
    const [country, setCountry] = useState('')
    const [job, setJob] = useState('')
    const [employment, setEmployment] = useState('')
    const [company, setCompany] = useState('')
    const [start, setStart] = useState(2021)
    const [end, setEnd] = useState(2022)
    const [active, setActive] = useState(false)
    const [openNew, setOpenNew] = useState(false)
    
    const [width, setWidth] = useState(0)
    
    const updateWidth = () => {
        setWidth(window.innerWidth)
        // console.log(window.innerWidth)
    }
    
    const {loading, error, data, refetch} = useQuery(getUserExperience, {variables: {userID: props.id?.replace('\"',"").replace('"',""),}})
    // if (data) {
    //     console.log(data.ExperiencesbyUserID)
    // }
    // console.log( props.id?.replace('\"',"").replace('"',""))
    const [addExp] = useMutation(addExperience, {
        variables: {
            userID: props.id?.replace('\"',"").replace('"',""),
            title: job,
            type: employment,
            company: company,
            country: country,
            isActive: active,
            startYear: start,
            endYear: end
        }
    })
    
    function goAdd(e: { preventDefault: () => void }){
        e.preventDefault()
        // console.log({
        //     userId: props.id?.replace('\"',"").replace('"',""),
        //     title: job,
        //     type: employment,
        //     company: company,
        //     country: country,
        //     isActive: active,
        //     startYear: start,
        //     endYear: end
        // })
        if (job == '') {
            setErrorTxt("Job title must not be empty.")
            return
        } else if (employment == '') {
            setErrorTxt("Employment type must not be empty.")
            return
        } else if (company == '') {
            setErrorTxt("Company must not be empty.")
            return
        } else if (country == '') {
            setErrorTxt("Country must not be empty.")
            return
        } else if (!start) {
            setErrorTxt('Start year must not be empty.')
            return
        } else if (!active && !end) {
            setErrorTxt('End year must not be empty.')
            return
        } else if (!active && (start > end)){
            setErrorTxt('End year must not be before start year.')
            return
        } else if (active) {
            setEnd(9999)
        }
        addExp().then((x: any) => {
            // console.log(x) 
            setErrorTxt('')
            refetch() 
            setOpenNew(!openNew)
        })
        .catch((m: { message: string }) => {
            setErrorTxt(m.message)
            // console.log("out: " + m.message)
        })
    }
    
    if(loading == false){
        // console.log(data)
    return(
        <div className="flex flex-col items-start bg-white rounded-md border-semitrans p-8 my-4">
            <div className="flex flex-row w-full ">
                <h3 className="p-0 m-0">Experiences</h3>
            </div>
            <div className="w-full my-2">
                    <div className="flex flex-col bg-white2 rounded-md py-3 my-2 w-full">
                        <input type="text" name="job" id="job" placeholder="Job Title" title="Job Title" className={`text-input mx-3 my-2 ${width>1000 ? 'w-half' : 'w-threefourth'}`} required onChange={e=> setJob(e.target.value)}/>
                        <input type="text" name="company" id="company" placeholder="Company/Institution" title="Company/Institution" className={`text-input mx-3 my-2 ${width>1000 ? 'w-half' : 'w-threefourth'}`} required onChange={e=>setCompany(e.target.value)}/>
                        <select id="country" name="country"  className={`text-input mx-3 my-2 ${width>1000 ? 'w-half' : 'w-threefourth'}`} title="Country" onChange={e => setCountry(e.target.value)}>
                            <option value="" disabled selected>Country</option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                        <select id="employment" name="employment" className={`text-input mx-3 my-2 ${width>1000 ? 'w-half' : 'w-threefourth'}`} title="Employment Type" required onChange={e => setEmployment(e.target.value)}>
                            <option value="" disabled selected>Employment Type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Self-employed">Self-employed</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Apprenticeship">Apprenticeship</option>
                            <option value="Seasonal">Seasonal</option>
                        </select>
                        <div className="flex flex-row mx-3 my-2">
                            <input type="number" name="start" id="start" placeholder="Start Year" title="Start Year" className={`text-input w-20`} required onChange={e=> setStart(parseInt(e.target.value))}/>
                            <h4 className="p-1 m-0 font-normal mx-3">until</h4>
                            <div className="mt-1 mr-4">
                                <input type="checkbox" name="active" id="active" placeholder="Active" onChange={e=> setActive(e.target.checked)}/>
                                <label htmlFor="active" className="mt-1">Now</label>
                            </div>
                            {
                            active == false && 
                            <input type="number" name="end" id="end" placeholder="End Year" title="End Year" className={`text-input w-20`} required onChange={e=> setEnd(parseInt(e.target.value))}/>
                            }
                        </div>
                        <div className="ml-3 my-1 text-left text-secondary">   {errortxt}</div>
                        <div className="flex flex-row ml-3">
                            <div className='bg-primary-adv border-primary rounded-md px-2 button-text-white py-1 my-2 mr-3 text-sm text-center hand w-onefourth' onClick={goAdd}>Add Experience</div>
                            <div className='bg-white-adv border-primary rounded-md px-2 button-text py-1 my-2 text-sm text-center hand w-onefourth' onClick={()=>{setOpenNew(!openNew)}}>Cancel</div>
                        </div>
                    </div>
                {data.getUserExperience.map((exp: any)=>{
                    // console.log(exp)
                    return(
                        <div className="flex flex-row">
                            <p>{exp.company}</p>
                            <div className="profile-inner-container bg  mt-5 pb-2 px-2 pr-2 w-97">
                                <div className="flex-row inline-flex justify-between w-100 p-2">
                                    <p className="text-lg w-fit m-0 mt-4"><b></b></p>
                                    <button className="flex mt-4 button-plus m-5">+</button>
                                </div>
                                <div className="inline-flex w-100 p-2 mb-2">
                                    <p className="w-fit m-0 mt-4 mr-4"><b>{exp.country}</b> </p>
                                    <p className="w-fit m-0 mt-4 mr-4"><b>{exp.title}</b>  - </p>
                                    <p className="w-fit m-0 mt-4 mr-4"><b>{exp.type}</b></p>
                                </div>
                                <p className="px-2">{exp.isactive}</p>
                                <p className="px-2">{exp.startYear} - {exp.endYear}</p>
                      </div>
                      </div>
                    )
                })}
            </div>
        </div>
    )
    }
}