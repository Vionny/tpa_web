export const Post: React.FC<{}> = ({})=>{
    return <div className="post-container " >
        <div className="flex items-center username-profile-pic">
            <img className="create-post-profile-pic"  src="https://i.pinimg.com/originals/26/8c/2a/268c2a61e262d539e5e90bfa44e5e12d.jpg" alt="" />
            <p className="text" id="likes-username">like's username</p>
            <p className="text" id="grey">likes this</p>
        </div>
        <hr className="m-0 mb-3"/>
        <div className="poster-container flex items-center username-profile-pic2">
        <img className="create-post-profile-pic" src="https://cdn.donmai.us/original/82/c2/__aether_genshin_impact_drawn_by_hane_odeu__82c2e1d4d2f6c0f41bcb4e767584487a.jpg" alt="" />
            <div>
            <p className="m-0">Aether</p>
            <p className="m-0">total follower</p>
            <p className="m-0 mb-3">2 weeks ago</p>
            </div>
        </div>

        <div className="post-container">
            <img className="post-img"id="content-img" src="https://pbs.twimg.com/media/Fc57gioXgAATvBA.jpg" alt="" />
            <p className="text" id="content-text">Lumine asked me to pose while wearing cute cat ears. Please dont judge me *sweats*</p>
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