import React, {useState, useEffect} from 'react';
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
import { getDatabase, ref, set, push } from "firebase/database";
import { LineWave } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import {BsFacebook} from 'react-icons/bs';
import { logedUser } from '../slices/userSlice';
import {useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [showPwd, setShowPwd] = useState(true);
  let [loginLoad, setLoginLoad] = useState(false);
  const data = useSelector(state => state.logedUser.value)

// this is useEffect check if user loged in or not 
  useEffect(() => {
    if(data){
      navigate("/");
    }
  },[])
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
    console.log(user.user)
    navigate("/");
    dispatch(logedUser(user.user))
      localStorage.setItem("user", JSON.stringify(user.user))
    set(push(ref(db, 'users')), {
      username: user.user.displayName,
      email: user.user.email,
      profile_picture : user.user.photoURL
    });
  }).catch((error) => {
    console.error("Error signing in with Google:", error);
  });
}
//facebook login
let handleFacebookLogin = () => {
  
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
      // if(user.user.emailVerified){
        navigate("/")
        dispatch(logedUser(user.user))
        localStorage.setItem("user", JSON.stringify(user.user))
      // }else{
      //   toast.error("Please varify your email address!");
      // }
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
  // forgetting password --> set a new password
  let forgotPassword = () => {

  }
  return (
    <Flex className='authentication'>
    <Flex className="registration_form">
        <div className='register_text--container'>
            <Heading className="registration_heading" as="h1" title="Login to your account!"/>
            <Link onClick={handleDirectLogin} className='gamil_login' to="#">
              <Paragraph className="gamil_login--content"><FcGoogle style={{fontSize: '20px'}}/> Login with Google</Paragraph>
            </Link>
            <Link onClick={handleFacebookLogin} className='gamil_login' to="#">
              <Paragraph className="gamil_login--content"><BsFacebook style={{fontSize: '20px'}}/> Login with Google</Paragraph>
            </Link>
            <TextField onChange={handleChange} name='email' className='register_inputField' type="email" id="password-input" label="Email Address" variant="standard" />
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
            <Paragraph className="created_account login_page--link">Forgot password ? <Link className='signIn_page--link' to="/resetpassword">Click here</Link></Paragraph>
        </div>
    </Flex>
    <div className="right_img">
        <Image className="authentication_bg" src={bg} alt="authentication bg"/>
    </div>
</Flex>
  )
}

export default Login