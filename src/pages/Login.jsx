import React, {useState} from 'react';
import Image from '../components/Image';
import bg from '../assets/login_bg.png';
import Flex from '../components/Flex';
import Heading from '../components/Heading';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paragraph from '../components/Paragraph';
import { Link, useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import Alert from '@mui/material/Alert';
import { getAuth, GoogleAuthProvider,signInWithPopup, signInWithEmailAndPassword} from "firebase/auth";
import { LineWave } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const Login = () => {
  const auth = getAuth();
  let [showPwd, setShowPwd] = useState(true);
  let [loginLoad, setLoginLoad] = useState(false);
  let navigate = useNavigate();

// this formData variable using for storing the inputValue of users
  let [formData, setFormData] = useState({
    email: "",
    password: ""
  })
//direct login with google account
let handleDirectLogin = () => {
  const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((user)=>{
    const {email} = user.user;
    navigate("/");
  }).catch((error) => {
    console.error("Error signing in with Google:", error);
  });
}
// this validationErr uses for storing the all error massege of inputErrors
  let [validationErr, setValidationErr] = useState({
    emailErr: "",
    passwordErr: ""
  })
// If the inputValue is change the handleChange function is worked
  let handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (e.target.name == "email"){
      validationErr.emailErr = "";
    }else{
      validationErr.passwordErr = "";
    }
  }
  // for handling the data and set the condition how data behave 
  let handleAuthentication = () => {
    setLoginLoad(true);
    let newValidationErr = {};
    console.log(newValidationErr);
    if(!formData.email){
      newValidationErr.emailErr = "Email required!";
    }
    if(!formData.password){
      newValidationErr.passwordErr = "Password required!";
    }
    setValidationErr(newValidationErr);
    if(formData.email && formData.password){
    // checking the email and password pattern is valid or not
      let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if(!emailPattern.test(formData.email)){
        newValidationErr.emailErr = "Invalid Email Address!";
      }
      if(!passwordPattern.test(formData.password)){
        newValidationErr.passwordErr = "Password not strong enough!";
      }
    //if user data is correct --> loged In
    signInWithEmailAndPassword(auth, formData.email, formData.password).then((user)=>{
      setLoginLoad(false)
      if(user.user.emailVerified){
        navigate("/")
      }else{
        toast.error("Please varify your email address!");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      if(errorCode.includes('user')){
        newValidationErr.emailErr = "Email doesn't match!";
      }else if(errorCode.includes('password')){
        newValidationErr.passwordErr = "Password doesn't match!";
      }
      setLoginLoad(false)
    });
    }
  }
  return (
    <Flex className='authentication'>
    <Flex className="registration_form">
        <div className='register_text--container'>
            <Heading className="registration_heading" as="h1" title="Login to your account!"/>
            <Link onClick={handleDirectLogin} className='gamil_login' to="#">
              <Paragraph className="gamil_login--content"><FcGoogle style={{fontSize: '20px'}}/> Login with Google</Paragraph>
            </Link>
            <TextField onChange={handleChange} name='email' className='register_inputField' type="email" id="standard-basic" label="Email Address" variant="standard" />
            {validationErr.emailErr &&
              <Alert className='validationErr' severity="warning">{validationErr.emailErr}</Alert>
            }
            <TextField onChange={handleChange} name='password' className='register_inputField' type={showPwd ? "password" : "text"} id="standard-basic" label="Password" variant="standard" />
            {showPwd 
                ?
                <AiFillEyeInvisible onClick={()=> setShowPwd(false)} className='eyeInvisible'/>
                :
                <AiFillEye onClick={()=> setShowPwd(true)} className='eyeInvisible'/>
                }
            {validationErr.passwordErr &&
              <Alert className='validationErr' severity="warning">{validationErr.passwordErr}</Alert>
            }
            {loginLoad
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
            <Button onClick={handleAuthentication} className='register_button' variant="contained">Login to continue</Button>
            }
            <Paragraph className="created_account login_page--link">Don't have an account ? <Link className='signIn_page--link' to="/authentication">Sign Up</Link></Paragraph>
        </div>
    </Flex>
    <div className="right_img">
        <Image className="authentication_bg" src={bg} alt="authentication bg"/>
    </div>
</Flex>
  )
}

export default Login