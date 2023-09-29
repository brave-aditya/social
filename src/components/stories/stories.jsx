import "./stories.scss"
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext.jsx';

const Stories = () => {

    const {currentUser} = useContext(AuthContext);
    //temparay data
    const stories = [
        {
            id:1,
            name:"Mannu Singh",
            img: "https://i.imgur.com/pbxL6IF.jpeg",
        },
        {
            id:2,
            name:"Mannu Singh",
            img: "https://images.pexels.com/photos/1927595/pexels-photo-1927595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id:3,
            name:"Mannu Singh",
            img: "https://cdn.pixabay.com/photo/2022/10/02/01/58/technology-7492577_1280.jpg",
        },
        {
            id:4,
            name:"Mannu Singh",
            img: "https://cdn.pixabay.com/photo/2022/12/07/02/58/ai-generated-7640108_1280.jpg",
        },
    ];

    return(
        <div className="stories">
            <div className="story">
                    <img src={"/upload/"+currentUser.profilePic} alt="" />
                    <span>{currentUser.name}</span>
                    <button>+</button>
                </div>
            {stories.map(story=>(
                <div className="story" key={story.id}>
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    )
}

export default Stories