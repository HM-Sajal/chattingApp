import React,{useState,useEffect} from 'react';
import Heading from './Heading';
import GroupPhoto from '../assets/group.png';
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const Friends = () => {
    const db = getDatabase();
    let userInfo = useSelector((state)=> state.logedUser.value)
    let [friendList, setFriendList] = useState([])

    useEffect(()=>{
        const FriendRef = ref(db, 'friends');
        onValue(FriendRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item =>{
                    arr.push({...item.val(),fid:item.key} )
            })
            setFriendList(arr)
        });
    },[])
    // handling the block friends part
    let handleBlock = (item)=>{
        if(userInfo.uid == item.whosendid){
            set(push(ref(db, 'block')), {
                blockid: item.whorecevedid,
                blockname: item.whorecevedname,
                blockbyid: item.whosendid,
                blockbyname: item.whosendname
            }).then(() => {
                remove(ref(db, 'friends/' + item.fid))
              })
        }else{
            set(push(ref(db, 'block')), {
                blockid: item.whosendid,
                blockname: item.whosendname,
                blockbyid: item.whorecevedid,
                blockbyname: item.whorecevedname
            }).then(() => {
                remove(ref(db, 'friends/' + item.fid))
              })
        }
        
    }
  return (
    <div className='box'>
        <Heading className="group_title" as="h3" title="Friends"/>
        {friendList.map(item=>(
            <div className='list'>
            <div className='group_userInfo'>
                <img src={GroupPhoto} alt="group" />
                <div>
                    <Heading className="group_heading" as="h4" title={item.whosendid == userInfo.uid ? item.whorecevedname : item.whosendname}/>
                    <Heading className="group_heading" as="h6" title="Hi Guys, Wassup!"/>
                </div>
            </div>
            <Button variant="contained" color='error' onClick={()=>handleBlock(item)}>Block</Button>
        </div>
        ))}
        
    </div>
  )
}

export default Friends