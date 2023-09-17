import React, { useState, useEffect } from 'react';
import Image from '../components/Image';
import bg from '../assets/authentication_bg.png';
import Flex from '../components/Flex';
import Heading from '../components/Heading';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paragraph from '../components/Paragraph';
import { Link, useNavigate } from 'react-router-dom';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import Alert from '@mui/material/Alert';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { LineWave } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  let [showPwd, setShowPwd] = useState(true);
  let [registerLoad, setRegisterLoad] = useState(false);
  let navigate = useNavigate();
  const data = useSelector(state => state.logedUser.value);
    useEffect(() => {
      if(data){
        navigate("/");
      }
    },[])
// this formData variable using for storing the inputValue of users
  let [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })
// this validationErr uses for storing the all error massege of inputErrors
  let [validationErr, setValidationErr] = useState({
    fullNameErr: "",
    emailErr: "",
    passwordErr: ""
  })
// If the inputValue is change the handleChange function is worked
  let handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if(e.target.name == "fullName"){
      validationErr.fullNameErr = "";
    }else if (e.target.name == "email"){
      validationErr.emailErr = "";
    }else{
      validationErr.passwordErr = "";
    }
  }
// for handling the data and set the condition how data behave 
  let handleAuthentication = () => {
    let newValidationErr = {} // creating an error object
    if(!formData.fullName){
      newValidationErr.fullNameErr = "Fullname required!";
    }
    if(!formData.email){
      newValidationErr.emailErr = "Email required!";
    }
    if(!formData.password){
      newValidationErr.passwordErr = "Password required!";
    }
    setValidationErr(newValidationErr);
    // email and password pattern check and full name must be type under 5 words!
    if(formData.fullName && formData.email && formData.password){
      const wordCount = formData.fullName.trim().split(/\s+/).length;
      let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
   
      if(wordCount > 5){
        newValidationErr.fullNameErr = "Lower then 5 characters!";
      }
      if(!emailPattern.test(formData.email)){
        newValidationErr.emailErr = "Invalid Email Address!";
      }
      if(!passwordPattern.test(formData.password)){
        newValidationErr.passwordErr = "Password not strong enough!";
      }
    // if user data is correct --> loged In
    setRegisterLoad(true);
    // start firebase authentication
    createUserWithEmailAndPassword(auth, formData.email, formData.password).then(()=>{
      updateProfile(auth.currentUser, {
        displayName: formData.fullName,
        photoURL: "https://firebasestorage.googleapis.com/v0/b/chattingapp-230e0.appspot.com/o/avatar.png?alt=media&token=f9148ade-055b-40de-830b-4466a7d109bd"
      }).then(() =>{
        sendEmailVerification(auth.currentUser).then(()=>{
          setFormData({ // if the account is created --> clear the input value
            fullName: "",
            email: "",
            password: ""
          })
          setRegisterLoad(false)// loading time when clicking the register
          setTimeout(()=>{ //if the account is created --> this setTimeOut function navigate you to the login page
            navigate("/login")
          },2000)
          toast("Registration Successfull! Please verify your email address!");
        }).then(()=>{
          set(push(ref(db, 'users')), {
            username: formData.fullName,
            email: formData.email,
            profile_picture : "https://firebasestorage.googleapis.com/v0/b/chattingapp-230e0.appspot.com/o/avatar.png?alt=media&token=f9148ade-055b-40de-830b-4466a7d109bd"
          });
        })
      })

      })
      // is something is wrong when authenticating .catch method get the error on console log
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        if(errorCode.includes("invalid-email")){
          // if the email is Invalid --> this will off the toast.error
        }else{
          toast.error("Email Already Exits!");
        }
        setRegisterLoad(false)
      })
    }
  }
  return (
    <Flex className='authentication'>
        <Flex className="registration_form">
            <div className='register_text--container'>
                <Heading className="registration_heading" as="h1" title="Get started with easily register"/>
                <Heading className="register_second--heading" as="h3" title="Free register and you can enjoy it"/>
                {/* Authentication form start */}
                <TextField onChange={handleChange} name='fullName' className='register_inputField register_first--inputField' type='text' id="outlined-basic" label="Full Name" variant="outlined" value={formData.fullName}/>
                {validationErr.fullNameErr &&
                  <Alert className='validationErr' severity="warning">{validationErr.fullNameErr}</Alert>
                }
                <TextField onChange={handleChange} name='email' className='register_inputField' type='text' id="outlined-basic" label="Email Address" variant="outlined" value={formData.email}/>
                {validationErr.emailErr &&
                  <Alert className='validationErr' severity="warning">{validationErr.emailErr}</Alert>
                }
                <TextField onChange={handleChange} name='password' className='register_inputField' type={showPwd ? "password" : "text"} id="outlined-basic" label="Password" variant="outlined" value={formData.password}/>
                {showPwd 
                ?
                <AiFillEyeInvisible onClick={()=> setShowPwd(false)} className='eyeInvisible'/>
                :
                <AiFillEye onClick={()=> setShowPwd(true)} className='eyeInvisible'/>
                }
                {validationErr.passwordErr &&
                  <Alert className='validationErr' severity="warning">{validationErr.passwordErr}</Alert>
                }
                {registerLoad 
                ?
                <Button className='register_button' variant="contained">
                  <LineWave
                    height="100"
                    width="100"
                    wrapperStyle={{ height: "10px", alignItems: "center", marginBottom: "25px"}}
                    visible={true}
                    firstLineColor="#ffcc00"
                    middleLineColor="#ffffff"
                    lastLineColor="#ff5733"
                  />
                </Button>
                :
                <Button onClick={handleAuthentication} className='register_button' variant="contained">Sign Up</Button>
                }
                <Paragraph className="created_account">Already  have an account ? <Link className='signIn_page--link' to="/login">Sign In</Link></Paragraph>
            </div>
        </Flex>
        <div className="right_img">
            <Image className="authentication_bg" src={bg} alt="authentication bg"/>
        </div>
    </Flex>
  )
}

export default Registration