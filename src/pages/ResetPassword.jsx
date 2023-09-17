import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      navigate("/login")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage)
    });  
  }

  return (
    <div className='resetPassword'>
      <div className='resetPassword_box'>
        <TextField onChange={(e)=> setEmail(e.target.value)} className='forgotEmail' id="standard-basic" label="Email" variant="standard" />
        <Button onClick={handleForgotPassword} variant="contained">submit</Button>
      </div>
    </div>
  )
}

export default ResetPassword