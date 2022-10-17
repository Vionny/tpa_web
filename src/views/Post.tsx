import { useLazyQuery, useQuery } from '@apollo/client';
import { getAllPosts, getUser } from '../controller/query/userQuery';
import React, { useEffect, useMemo, useRef, useState } from 'react';

export const CurrPoster = (id: any)=>{
    const {loading,data,error} = useQuery(getUser,{variables: {id:id.id}});
    // console.log(id)
    let user
    console.info(localStorage.getItem("userid"))
    if(loading == false){
        console.log(data)
        user = data.getCurrentUser
        
        return <div className="poster-container flex items-center username-profile-pic2">
                <img className="create-post-profile-pic" src={user.profilephotourl} alt="" />
                <div>
                <p className="m-0">{user.firstname + " " + user.lastname}</p>
                {/* <p className="m-0">total follower</p> */}
                </div>
            </div>
    }
    
}

export const Post: React.FC<{}> = ({})=>{

    // const {loading,data,error} = useQuery(getAllPosts, {variables:{limit : 3, offset :0}})
    var limit = 4
    const [offset, setOffset] = useState(0)
    const [empty, setEmpty] = useState(false)
    const [posts, setPosts] = useState<Array<any>>([])
    const [loading, setLoading] = useState(false)
    const [last,setLast] = useState(0)
    const ref = useRef<HTMLDivElement>(null);
    const [loadinganimation, setShowLoadingAnimation] = useState(false)
    const [queryPostsFunc, {loading:postsLoading, error: error}]= useLazyQuery(getAllPosts)
    
    const onAddPost = (post : any)=>{
      setPosts([post, ...posts])
      setOffset(offset + 1)
    }
  
    const onLoadMore = ()=>{
      if(loading || empty) return
      setShowLoadingAnimation(true)
      setLoading(true)
      queryPostsFunc({
        variables:{
          "limit" : limit,
          "offset" : offset
        }, // 1-6
      }).then((data)=>{
        console.info(data)
        var newPosts = data.data.getAllPosts as any[]
        if(newPosts.length < limit) setEmpty(true)
        var mergedPosts = [...posts, ...newPosts]
        // mergedPosts = uniqBy(mergedPosts, (e)=>{
        //   return e.ID
        // })
        if(!loading) setPosts(mergedPosts)
        console.log(posts)
        
      })
      setOffset(offset + limit)
      setTimeout(()=>{
        setLoading(false)
      }, 1000)
      setTimeout(()=>{
        setShowLoadingAnimation(false)
      }, 1000)
      
    }
  
  
    window.onscroll = ()=>{
        const check = window.innerHeight + window.scrollY
        console.log(window.innerHeight + window.scrollY)
        console.log(window.innerHeight)
        console.log( window.scrollY)
        console.log((ref?.current?.offsetHeight as number))
        if(!loading && !postsLoading && !error && ref && (check >= (ref?.current?.offsetHeight as number))){
          onLoadMore()
        }
      }

  
    useEffect(()=>{
      onLoadMore()
    }, [])

    // if(loading) return <div>Loading...</div>
    // console.log(data)
    return <div ref={ref}>
        {posts.map((post : any)=>{
            
            if(!loading){
                return <div className="post-container " >
                <div className="flex items-center username-profile-pic">
                    <img className="create-post-profile-pic"  src="https://i.pinimg.com/originals/26/8c/2a/268c2a61e262d539e5e90bfa44e5e12d.jpg" alt="" />
                    <p className="text" id="likes-username">like's username</p>
                    <p className="text" id="grey">likes this</p>
                </div>
                <hr className="m-0 mb-3"/>s
                <CurrPoster id={post.userid as string}/>

                <div className="post-container">
                    {post.type=="image"? <img className="post-img"id="content-img" src={post.link} alt="" />:<div></div>}
                    {post.type=="video"? <video className="post-img"id="content-img" src={post.link} />:<></>}
                    <p className="text" id="content-text">{post.text}</p>
                </div>

                <hr />

                <div className="buttons flex">
                    <div className="flex items-center" id="btn">
                        <p className="text">Like</p>
                    </div>

                    <div className="flex items-center" id="btn">
                        <p className="text">Comment</p>
                    </div>

                    <div className="flex items-center" id="btn">
                        <p className="text">Share</p>
                    </div>

                    <div className="flex items-center" id="btn">
                        <p className="text">Send</p>
                    </div>
                    
                
                </div>
            </div>
            }
        })}
        {loadinganimation && <div className="loader-container"></div>}
    </div>
}