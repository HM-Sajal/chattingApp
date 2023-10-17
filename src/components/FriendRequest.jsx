import React, { useEffect, useState } from 'react';
import Heading from './Heading';
import GroupPhoto from '../assets/group.png';
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {
    const db = getDatabase();
    let [friendRequestList, setFriendRequestList] = useState([])
    let userInfo = useSelector((state)=> state.logedUser.value)

    useEffect(()=>{
        const FriendRequestRef = ref(db, 'friendrequest');
        onValue(FriendRequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item =>{
                if(userInfo.uid == item.val().whorecevedid){
                    arr.push({...item.val(),frid:item.key} )
                }
            })
            setFriendRequestList(arr)
        });
    },[])
    let handleFriendRequestDelate = (item)=>{
        remove(ref(db, 'friendrequest/'+item.frid))
    }

    let handleFriendRequestAccept = (item) => {
        console.log("Accept",item)
        set(push(ref(db, 'friends/')), {
            ...item
        }).then(()=>{
            remove(ref(db, 'friendrequest/'+item.frid))
        })
    }
    return (
        <div className='box'>
            <Heading className="group_title" as="h3" title="Friend  Request"/>
            {friendRequestList.map(item=>(
                <div className='list'>
                <div className='group_userInfo'>
                    <img src={GroupPhoto} alt="group" />
                    <div>
                        <Heading className="group_heading" as="h4" title={item.whosendname}/>
                        <Heading className="group_heading" as="h6" title="Hi Guys, Wassup!"/>
                    </div>
                </div>
                <div className='fRequestBtn'>
                    <Button onClick={()=>handleFriendRequestAccept(item)} variant="contained">Accept</Button>
                    <Button onClick={()=>handleFriendRequestDelate(item)} variant="contained" color="error">Delate</Button>
                </div>
            </div>
            ))}  
        </div>
  )
}

export default FriendRequest