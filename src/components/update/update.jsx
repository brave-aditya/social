import { useState, useContext } from 'react'
import './update.scss'
import {useQueryClient, useMutation} from '@tanstack/react-query'
import {makeRequest} from "../../axios"
import axios from "axios";
import {IoCloudUploadOutline} from "react-icons/io5" 
const Update = ({setOpenUpdate, user}) => {
    const [cover, setCover]=useState(null)
    const [profile, setProfile]=useState(null)

    const [texts,setTexts] =useState({
        city:user.city,
        password:user.password,
        name:user.name,
        email:user.email,
        website:user.website,
    });

    const upload = async (file)=>{
      const formData = new FormData();
      formData.append("image", file)
      try{
        const { data: response } = await axios.post('https://api.imgbb.com/1/upload?key=b99e1b7e44deb3985e33be22d597e53f', formData)
        return response.data.url; 
        }catch (error){
          console.log(error)
        }  
      }

      const queryClient = useQueryClient()

      const mutation = useMutation(
        (user) => {
          return makeRequest.put("/users", user);
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["user"]);
          },
        }
      );
      const handleClick = async (e) =>{
        e.preventDefault();
        let coverUrl;
        let profileUrl;

        coverUrl = cover ? await upload(cover) : user.coverPic
        profileUrl = profile ? await upload(profile) : user.profilePic

        mutation.mutate({...texts, coverPic: coverUrl, profilePic: profileUrl}) 
        
        setOpenUpdate(false);
      
    };

    const handleChange = e =>{
        setTexts(prev=>({...prev, [e.target.name]:[e.target.value]}))
    }
    return (
      <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      :  user.coverPic
                  }
                  alt=""
                />
                <IoCloudUploadOutline className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      :  user.profilePic
                  }
                  alt=""
                />
                <IoCloudUploadOutline className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={texts.password}
            name="password"
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  )
}
export default Update
