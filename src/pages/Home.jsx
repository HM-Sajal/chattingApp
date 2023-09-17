import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import GroupList from '../components/GroupList';
import FriendRequest from '../components/FriendRequest';
import Friends from '../components/Friends';
import MyGroup from '../components/MyGroup';
import UserList from '../components/UserList';
import BlockedUser from '../components/BlockedUser';

const Home = () => {
  let navigate = useNavigate();
  const data = useSelector(state => state.logedUser.value)

// this is useEffect check if user loged in or not 
  useEffect(() => {
    if(!data){
      navigate("/login");
    }
  },[])


  // create account or loged In
    return (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <GroupList/>
            <FriendRequest/>
          </Grid>
          <Grid item xs={4}>
            <Friends/>
            <MyGroup/>
          </Grid>
          <Grid item xs={4}>
            <UserList/>
            <BlockedUser/>
          </Grid>
        </Grid>
    )
}

export default Home