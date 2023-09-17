import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let [user, setUser] = useState(null);
  const data = useSelector(state => state.logedUser.value)

// this is useEffect check if user loged in or not 
  useEffect(() => {
    if(!data){
      navigate("/login");
    }
  },[])

  let handleLogOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    })
  }
  if(user){ // if user is loged in then redirect with Home page
    return (
      <>
        <Button onClick={handleLogOut} variant="contained">Contained</Button>
      </>
    )
  }else{  // create account or loged In
    return (
      <>
        <h2>if you don't have account then create an account.</h2> 
         <h2> Or if you have already an account please loged In.</h2>
        <Link to="/authentication">
          <Button variant="contained">Registration</Button>
        </Link>
        <Link to="/login">
          <Button variant="contained">Log In</Button>
        </Link>
      </>
    )
  }

}

export default Home