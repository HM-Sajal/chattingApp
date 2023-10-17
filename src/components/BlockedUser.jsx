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
    console.log("block user",blockuser)

  return (
    <div className='box'>
        <Heading className="group_title" as="h3" title="Blocked Users"/>
        {blockuser.map((item)=>(
            <div className='list'>
            <div className='group_userInfo'>
                <img src={GroupPhoto} alt="group" />
                <div>
                    <Heading className="group_heading" as="h4" title="Friends Reunion"/>
                    <Heading className="group_heading" as="h6" title="Hi Guys, Wassup!"/>
                </div>
            </div>
            <Button variant="contained">Join</Button>
        </div>
        ))}
        
    </div>
  )
}

export default BlockedUser