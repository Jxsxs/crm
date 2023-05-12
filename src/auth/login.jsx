import './login.css';
import React from 'react';
import { useState } from 'react';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, signInWithPhoneNumber } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { setCurrentUser } from '../redux/reducers/auth-reducer';
import { connect } from 'react-redux';
import { db } from "../api/api";
import { doc, setDoc, getDoc, getCountFromServer, getDocs, collection } from "firebase/firestore"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const firebaseConfig = {
  apiKey: "AIzaSyBnVHiabkRt2zsfiS5eJOtu1y0-sYmKfa8",
  authDomain: "crmauth-bd927.firebaseapp.com",
  databaseURL: "https://crmauth-bd927-default-rtdb.firebaseio.com",
  projectId: "crmauth-bd927",
  storageBucket: "crmauth-bd927.appspot.com",
  messagingSenderId: "461028285050",
  appId: "1:461028285050:web:f265edff880009c60979c3"
};

const app = initializeApp(firebaseConfig);

const Login = (props) =>{
    const [type, setType] = useState('signIn')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function emailChange(e) {
      setEmail(e.target.value);
    }
    function passwordChange(e) {
        setPassword(e.target.value);
    }
    const [isRegistered, setIsRegistered] = useState(null);
  
    const auth = getAuth(app);

    
    async function signUp(e) {
      e.preventDefault();
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const email = user.email;
          await setDoc(doc(db, "users", `${uid}`), {
            age: null,
            driveFrom: null,
            driveTo: null,
            firstName: null,
            lastName: null,
            login: email,
            role: 'user',
            uid: uid,
          });
          props.setAuthUser({
            age: null,
            driveFrom: null,
            driveTo: null,
            firstName: null,
            lastName: null,
            login: email,
            role: 'user',
            uid: uid,
          })
        }
        setIsRegistered(true);
      } catch (error) {
        setIsRegistered(false);
      }
    }
    async function signUpWithGoogle(e) {
      e.preventDefault();
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const email = user.email;
          await setDoc(doc(db, "users", `${uid}`), {
            age: null,
            driveFrom: null,
            driveTo: null,
            firstName: null,
            lastName: null,
            login: email,
            role: 'user',
            uid: uid,
          });
          props.setAuthUser({
            age: null,
            driveFrom: null,
            driveTo: null,
            firstName: null,
            lastName: null,
            login: email,
            role: 'user',
            uid: uid,
          })
        }
        setIsRegistered(true);
      } catch (error) {
        setIsRegistered(false);
      }
    }

    async function signUpWithFacebook(e) {
      e.preventDefault();
      const provider = new FacebookAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const email = user.email;
          await setDoc(doc(db, "users", `${uid}`), {
            age: null,
            driveFrom: null,
            driveTo: null,
            firstName: null,
            lastName: null,
            login: email,
            role: 'user',
            uid: uid,
          });
          props.setAuthUser({
            age: null,
            driveFrom: null,
            driveTo: null,
            firstName: null,
            lastName: null,
            login: email,
            role: 'user',
            uid: uid,
          })
        }
        setIsRegistered(true);
      } catch (error) {
        setIsRegistered(false);
      }
    }

    
    async function signIn(e) {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const email = user.email;
          const usersCollectionRef = collection(db, 'users')
          const data = await getDocs(usersCollectionRef)
          const filteredData = data.docs.map((doc)=>({
              ...doc.data(),
              id: doc.id,
          }))
          filteredData.forEach(user=>{if(user.id===uid){props.setAuthUser(user)}})
          
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
      }
    }

    async function signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
          const uid = user.uid;
          const email = user.email;
        const usersCollectionRef = collection(db, 'users')
          const data = await getDocs(usersCollectionRef)
          const filteredData = data.docs.map((doc)=>({
              ...doc.data(),
              id: doc.id,
          }))
          filteredData.forEach(user=>{if(user.id===uid){props.setAuthUser(user)}})
      } catch (error) {
        console.error(error);
      }
    }
    async function signInWithFacebook() {
      const provider = new FacebookAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
          const uid = user.uid;
          const email = user.email;
          const usersCollectionRef = collection(db, 'users')
          const data = await getDocs(usersCollectionRef)
          const filteredData = data.docs.map((doc)=>({
              ...doc.data(),
              id: doc.id,
          }))
          filteredData.forEach(user=>{if(user.id===uid){props.setAuthUser(user)}})
      } catch (error) {
        console.error(error);
      }
    }


if(type=='signIn'){
    return (
      <div className='login-form'>
        <h1>SignIn</h1>
        <input type="email" id="email" value={email} onChange={emailChange} placeholder='enter email'/>
        <input type="password" id="password" value={password} onChange={passwordChange} placeholder='enter password'/>
        <Button variant='primary' onClick={signIn}>login</Button>
        <p>SignIn with:</p>
        <div className='variants'>
          <img alt='' onClick={signInWithFacebook} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEU7WZj////e4uwoTZLr7fQvUpUtUJT7/P04WJnQ1uT4+fy0vdM8Wpk0VJXh5e4hSJB4irTHzt9KZZ+PnsCgrMlxhLFQaqLy9PiVosKlscxkeKmHl7yrtc6DlLpqfqxXbqTCydzV2+dDYZ4YRI/fiYA0AAAEX0lEQVR4nO3d23qiMBiFYTCAQRs24t5Orfb+73G0jk9tp5UlEMKfru9oTobhbdkNgRCEH0XZyI+y6EYVXP9QFjpRvpToovwiLGfKBD5l1Ky8FVa5dr1Knafz6kNYKNerYyVVXIWVn8ATsboI09z1mlgrT9+FM//2wWt6dhaWvm6j51R5EhZ+nSY+Z4qT0N9t9JwOgyhxvRJWS6Ig83k3PO2IWTDyXDiiUHoUyo9C+VEoPwrlR6H8KJQfhfKjUH4Uuk1rY0wcJ+fiU+ac1jp44AbocIUmVrlZbovder553mw28/m62v0pFi/b/exoLsOgsamnDlOoY/X0Mn+NVuH3TVar6FBOn6vFspY4RGGslvPD5Afcl6a1t7MHJ9RKzzNMJ1Ko831Zz5Ir1GqfPuSTJkyOrw/6ZAm12oFHF6FCYx7bAcUJ4/1P5z5PhJcHXzwWql1DoBShqpoChQiTppuoFKHZNgeKEGrT7CgqR5g/eqEmTZg0P8rIEOpjK6AAoWp0rSZIaF7aAYcvVCPPhWbREjh4YX7wXKj3bYFDFyZT34V5g9sWooTtjzNDF3awkQ5cmEf1AtHC88sefgvjRv+rGH9q2EL1wB3uaLpe7I/Hp/8b8uiaQoeYVpulUrHR32GGPEKqzRgDbuKkzVs9DoVLyDfetlw9d0KD3UPcxi3/HXfCeI4A27/d6k4IXdFkqvWLde6E0B2aP+1fjXQoPNQDJx28++lQCJwO0w5WzaEQuO6etz2QBk6PNIBwIXorjQFh/TNd9TkTakTYxTvYwxbG3v8OW11y/2vQwjGFSBRai0IK4Si0FoUUwlFoLQophKPQWhRSCEehtX6BELgjPHyhDvTPYb/D+wVPboU6rjW0DZiY1KowsS7cu30Woweh663UunAF3PaXLUSmXpUtROZ4li18BiYIli1cA6PgsoXIKLhsITKZvGwhct0qWhghay5aCK25aOGr98INMl++aGGFPBQmWviCPBQmWnhEbnKIFkKfx5EsjLwXYs/XShZCp0PRQuwJYslC7EF+yULodChaCJ0OJQvH2NfiBAsz74Xg6yaChfWvAEsXIrcSZQvBT/4JFm6xAWKrY8AmvRcw7cfdv3/EVsLuOP69bxK/AaPcb/cWgK4Dn8WwFYUUwlFoLQophKPQWhRSCEehtSikEI5Ca1FIIRyF1qKQQjgKrUUhhXAUWotCCuEotBaFFMJRaC0KKYSj0FoUUghHobUopBCOQmtRSCEchdaikEI4Cq1FIYVwFFqLQgrhKLQWhRTCUWgtCimE+xVCZFLs7utPmAURNs9Lx/UmTKKgk2/SPlxvQh0G6EQv3daX0BQnITJ3e+f1JVTlSQhNi911PQn1LDwLU2xesE7rSZin78Kw6n877UeoqvAiDIveib0IVRFehWGV97wv9iDUeRV+CMN0pno9aVj/3pNRszS8FYZhWejk3sxTHQfMhDV5a7z0RBfldTHBzSKjbNRfk/oaLzu7/fH9Bd9ZZCH9N718AAAAAElFTkSuQmCC' />
          <img alt='' onClick={signInWithGoogle} src='data:image/png;base64,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'/>
          <img alt='' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAr1awZ4EEzlI_Hzc9mFhDy1lG-tC8MIHNjQ&usqp=CAU'/>        
        </div>
        <a onClick={()=>{setType('signUp')}}>SignUp</a>
      </div>
    )
  }if(type=='signUp'){
    return(
          <div className='login-form'>
        <h1>SignUp</h1>
        <input type="email" id="email" value={email} onChange={emailChange} placeholder='enter email'/>
        <input type="password" id="password" value={password} onChange={passwordChange} placeholder='enter password'/>
        <Button variant='primary' onClick={signUp}>create account</Button>

        <p>SignUp with:</p>
        <div className='variants'>
          <img alt='' onClick={signUpWithFacebook} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEU7WZj////e4uwoTZLr7fQvUpUtUJT7/P04WJnQ1uT4+fy0vdM8Wpk0VJXh5e4hSJB4irTHzt9KZZ+PnsCgrMlxhLFQaqLy9PiVosKlscxkeKmHl7yrtc6DlLpqfqxXbqTCydzV2+dDYZ4YRI/fiYA0AAAEX0lEQVR4nO3d23qiMBiFYTCAQRs24t5Orfb+73G0jk9tp5UlEMKfru9oTobhbdkNgRCEH0XZyI+y6EYVXP9QFjpRvpToovwiLGfKBD5l1Ky8FVa5dr1Knafz6kNYKNerYyVVXIWVn8ATsboI09z1mlgrT9+FM//2wWt6dhaWvm6j51R5EhZ+nSY+Z4qT0N9t9JwOgyhxvRJWS6Ig83k3PO2IWTDyXDiiUHoUyo9C+VEoPwrlR6H8KJQfhfKjUH4Uuk1rY0wcJ+fiU+ac1jp44AbocIUmVrlZbovder553mw28/m62v0pFi/b/exoLsOgsamnDlOoY/X0Mn+NVuH3TVar6FBOn6vFspY4RGGslvPD5Afcl6a1t7MHJ9RKzzNMJ1Ko831Zz5Ir1GqfPuSTJkyOrw/6ZAm12oFHF6FCYx7bAcUJ4/1P5z5PhJcHXzwWql1DoBShqpoChQiTppuoFKHZNgeKEGrT7CgqR5g/eqEmTZg0P8rIEOpjK6AAoWp0rSZIaF7aAYcvVCPPhWbREjh4YX7wXKj3bYFDFyZT34V5g9sWooTtjzNDF3awkQ5cmEf1AtHC88sefgvjRv+rGH9q2EL1wB3uaLpe7I/Hp/8b8uiaQoeYVpulUrHR32GGPEKqzRgDbuKkzVs9DoVLyDfetlw9d0KD3UPcxi3/HXfCeI4A27/d6k4IXdFkqvWLde6E0B2aP+1fjXQoPNQDJx28++lQCJwO0w5WzaEQuO6etz2QBk6PNIBwIXorjQFh/TNd9TkTakTYxTvYwxbG3v8OW11y/2vQwjGFSBRai0IK4Si0FoUUwlFoLQophKPQWhRSCEehtX6BELgjPHyhDvTPYb/D+wVPboU6rjW0DZiY1KowsS7cu30Woweh663UunAF3PaXLUSmXpUtROZ4li18BiYIli1cA6PgsoXIKLhsITKZvGwhct0qWhghay5aCK25aOGr98INMl++aGGFPBQmWviCPBQmWnhEbnKIFkKfx5EsjLwXYs/XShZCp0PRQuwJYslC7EF+yULodChaCJ0OJQvH2NfiBAsz74Xg6yaChfWvAEsXIrcSZQvBT/4JFm6xAWKrY8AmvRcw7cfdv3/EVsLuOP69bxK/AaPcb/cWgK4Dn8WwFYUUwlFoLQophKPQWhRSCEehtSikEI5Ca1FIIRyF1qKQQjgKrUUhhXAUWotCCuEotBaFFMJRaC0KKYSj0FoUUghHobUopBCOQmtRSCEchdaikEI4Cq1FIYVwFFqLQgrhKLQWhRTCUWgtCimE+xVCZFLs7utPmAURNs9Lx/UmTKKgk2/SPlxvQh0G6EQv3daX0BQnITJ3e+f1JVTlSQhNi911PQn1LDwLU2xesE7rSZin78Kw6n877UeoqvAiDIveib0IVRFehWGV97wv9iDUeRV+CMN0pno9aVj/3pNRszS8FYZhWejk3sxTHQfMhDV5a7z0RBfldTHBzSKjbNRfk/oaLzu7/fH9Bd9ZZCH9N718AAAAAElFTkSuQmCC' />
          <img alt='' onClick={signUpWithGoogle} src='data:image/png;base64,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'/>
          <img alt='' onClick={console.log('saaa')} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAr1awZ4EEzlI_Hzc9mFhDy1lG-tC8MIHNjQ&usqp=CAU'/>        
        </div>
        <a onClick={()=>{setType('signIn')}}>SignIn</a>
      </div>
    )
  }
}

let mapDispatchToProps = (dispatch) => {
  return{
    setAuthUser: (user) => dispatch(setCurrentUser(user))
  }
}

export default connect(null, mapDispatchToProps)(Login);