import React,{useState, useEffect} from 'react';
import Heading from './Heading';
import GroupPhoto from '../assets/group.png';
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockedUser = () => {
    const db = getDatabase();
    let [blockuser, setBlockuser] = useState([])
    let userInfo = useSelector((state)=> state.logedUser.value)

    useEffect(()=>{
        const BlockuserRef = ref(db, 'block');
        onValue(BlockuserRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item =>{
                    arr.push({...item.val(),bid:item.key} )
            })
            setBlockuser(arr)
        });
    },[])
    let handleUnblock = (item)=>{
        set(push(ref(db, 'friends')), {
            whosendname: item.blockbyname,
            whosendid: item.blockbyid,
            whorecevedname: item.blockname,
            whorecevedid: item.blockid
        }).then(()=>{
            remove(ref(db, 'block/'+item.bid))
        })
    }

  return (
    <div className='box'>
        <Heading className="group_title" as="h3" title="Blocked Users"/>
        {blockuser.map((item)=>(
            <div className='list'>
            <div className='group_userInfo'>
                <img src={GroupPhoto} alt="group" />
                <div>
                    <Heading className="group_heading" as="h4" title={item.blockbyid == userInfo.uid? item.blockname:item.blockbyname}/>
                    <Heading className="group_heading" as="h6" title="Hi Guys, Wassup!"/>
                </div>
            </div>
            {item.blockbyid == userInfo.uid&&
                <Button variant="contained" onClick={()=>handleUnblock(item)}>Unblock</Button>
            }
        </div>
        ))}
        
    </div>
  )
}

export default BlockedUser