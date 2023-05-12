import React, {useState} from "react";
import { db } from "../api/api";
import { doc, setDoc } from "firebase/firestore";
import { connect } from "react-redux";
import { changeInfo } from "../redux/reducers/auth-reducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import './profileForm.css'

const ProfileForm = (props)=>{
    const [firstName, setFirstName] = useState();
    function firstNameChange(e) {
        setFirstName(e.target.value);
      }
    const [lastName, setLastName] = useState();
    function lastNameChange(e) {
        setLastName(e.target.value);
      }
    const [age, setAge] = useState();
    function ageChange(e) {
        setAge(e.target.value);
      }

    const [car, setCar] = useState();
    function carChange(e) {
        setCar(e.target.value);
      }
    if(props.isAuth==false){
      return <Navigate to='/' />
    }else{
      return(
          <div className="form">
          <h1>Заповніть ваш профіль</h1>
          <div>
            <div>
          <input type="text" id="firstName" value={firstName} onChange={firstNameChange} placeholder={`вкажіть ім'я`}/>
            </div>
            <div>
          <input type="text" id="lastName" value={lastName} onChange={lastNameChange} placeholder={`вкажіть прізвище`}/>
            </div>
            <div>
          <input type="text" id="age" value={age} onChange={ageChange} placeholder={`вкажіть ваш вік`}/>
            </div>
          </div>
          <Button variant='primary' onClick={async()=>{ await setDoc(doc(db, "users", `${props.user.uid}`), {
              age: age,
              driveFrom: null,
              driveTo: null,
              firstName: firstName,
              lastName: lastName,
              login: props.user.login,
              role: 'user',
              uid: props.user.uid,
            })
            props.updateUser(firstName, lastName, age)
            }}>Зберегти зміни</Button>
          </div>
          )
    }
}

let mapDispatchToProps = (dispatch) => {
  return{
    updateUser: (firstName, lastName, age)=>{dispatch(changeInfo(firstName, lastName, age))}
  }
}

let mapStateToProps = (state)=>{
  return{
    isAuth: state.auth.isAuth
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);