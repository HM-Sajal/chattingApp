import React,{useState,useEffect} from 'react';
import Heading from './Heading';
import GroupPhoto from '../assets/group.png';
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const MyGroup = () => {
    const db = getDatabase();
    let userInfo = useSelector((state)=> state.logedUser.value)
    let [groupList, setGroupList] = useState([])

    useEffect(()=>{
        const GroupRef = ref(db, 'group');
        onValue(GroupRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item =>{
                if(item.val().adminid == userInfo.uid){
                    arr.push(item.val())
                }
            })
            setGroupList(arr)
        });
    },[])
  return (
    <div className='box'>
        <Heading className="group_title" as="h3" title="My Groups"/>
        {groupList.map(item=>(
        <div className='list'>
            <div className='group_userInfo'>
                <img src={GroupPhoto} alt="group" />
                <div>
                    <Heading className="group_heading" as="h4" title={item.groupname}/>
                    <Heading className="group_heading" as="h6" title={item.grouptag}/>
                </div>
            </div>
            <div className='mygroup_btn'>
                <Button variant="contained">RL</Button>
                <Button variant="contained">ML</Button>
            </div> 
        </div>
        ))}
        
    </div>
  )
}

export default MyGroup