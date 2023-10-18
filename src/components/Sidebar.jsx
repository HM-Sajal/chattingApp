import React, { useState } from 'react';
import {AiFillHome, AiFillMessage} from 'react-icons/ai';
import {IoIosNotifications} from 'react-icons/io'
import {TbSettings} from 'react-icons/tb'
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logedUser } from '../slices/userSlice';
import GroupPhoto from '../assets/group.png';

const Sidebar = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const userInfo = useSelector((state)=> state.logedUser.value)
  let [pageactive, setPageactive] = useState("home");
  let handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(logedUser(null))
      localStorage.removeItem("user")
      navigate("/login");
    })
  }
  return (
      <div className='sidebar'>
          <img className='sidebarImg' src={userInfo.photoURL}/>
          <h2 className='sidebarName'>{userInfo.displayName}</h2>

          <ul className='sidebar_iconList'>
            <li onClick={()=> setPageactive("home")} className={pageactive == "home" ? "active" : ""}><Link to="/"><AiFillHome className='icon'/></Link></li>
            <li onClick={()=> setPageactive("msg")} className={pageactive == "msg" ? "active" : ""}><Link to="/msg"><AiFillMessage className='icon'/></Link></li>
            <li onClick={()=> setPageactive("notification")} className={pageactive == "notification" ? "active" : ""}><Link to="/notification"><IoIosNotifications className='icon'/></Link></li>
            <li><Link to="#"><TbSettings className='icon'/></Link></li>
          </ul>
          <div className='logOutBtn' onClick={handleLogOut}>
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 54 58" fill="none">
              <g filter="url(#filter0_d_101_16)">
              <path d="M40.8 30.6667V24.5333H25.4667V18.4H40.8V12.2667L50 21.4667L40.8 30.6667ZM37.7333 27.6V39.8667H22.4V49.0667L4 39.8667V0H37.7333V15.3333H34.6667V3.06667H10.1333L22.4 9.2V36.8H34.6667V27.6H37.7333Z" fill="white"/>
              </g>
              <defs>
              <filter id="filter0_d_101_16" x="0" y="0" width="54" height="57.0667" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_101_16"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_101_16" result="shape"/>
              </filter>
              </defs>
              </svg>
            </div>
      </div>
  )
}

export default Sidebar