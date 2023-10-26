import React, { useState, useEffect } from 'react';
import Heading from './Heading';
import GroupPhoto from '../assets/group.png';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const GroupList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const db = getDatabase();
  let userInfo = useSelector((state)=> state.logedUser.value)
  let [gname,setGname] = useState()
  let [gtagname,setGtagname] = useState()
  let [groupList, setGroupList] = useState([])

  useEffect(()=>{
    const GroupRef = ref(db, 'group');
    onValue(GroupRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item =>{
            if(item.val().adminid != userInfo.uid){
                arr.push(item.val())
            }
        })
        setGroupList(arr)
    });
},[])

  let handleCreateGroup = ()=>{
      console.log(gname,gtagname)
      set(push(ref(db, 'group')), {
        groupname: gname,
        grouptag: gtagname,
        adminid: userInfo.uid,
        adminname: userInfo.displayName
    }).then(()=>{
      setOpen(false)
    })
  }
  return (
    <div className='box'>
        <div className="group_wrapper">
            <Heading className="group_title" as="h3" title="Grouplist"/>
            <h2 onClick={handleOpen}>+</h2>
        </div>
        {groupList.map(item=>(
          <div className='list'>
          <div className='group_userInfo'>
              <img src={GroupPhoto} alt="group" />
              <div>
                  <Heading className="group_heading" as="h4" title={item.groupname}/>
                  <Heading className="group_heading" as="h6" title={item.grouptag}/>
              </div>
          </div>
          <Button variant="contained">Join</Button>
      </div>
        ))} 
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Group
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField onChange={(e)=>setGname(e.target.value)} id="standard-basic" label="Group Name" variant="standard" />
          <TextField onChange={(e)=>setGtagname(e.target.value)} id="standard-basic" label="Group Tag" variant="standard" />
          <Button onClick={handleCreateGroup} variant="contained">Create</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default GroupList