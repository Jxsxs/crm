import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import ProfileForm from "../profileForm/profileForm";
import './profile.css'

const ProfilePage = (props) => {

    if(props.user.firstName == null){
      return <ProfileForm user={props.user}/>
    } if(props.user.role=='driver'){
        return(
            <div className="profile">
            <h1>Ваш профіль</h1>
            <div className="profile-info">
            <h2>Ви увійшли як:  {props.user.login}</h2>
            <h2>Вас звати: {props.user.firstName}</h2>
            <h2>Ваше прізвище: {props.user.lastName}</h2>
            <h2>Ваш вік: {props.user.age || <h2>ще не вказали</h2>}</h2>
            <h2>Ви: {props.user.role}</h2>
            <h2>Ваша машина: {props.user.markOfCar || <h3>ще не вказали</h3>}</h2>
            <h2>Ви їдете з {props.user.driveFrom || <h3>не вказали</h3>} до {props.user.driveTo || <h3>не вказали</h3>}</h2>
            </div>
        </div>
)
}if(props.user.role=='dispatcher'){
  return(
    <div className="profile">
    <h1>Ваш профіль</h1>
    <div className="profile-info">
    <h2>Ви увійшли як:  {props.user.login}</h2>
    <h2>Вас звати: {props.user.firstName}</h2>
    <h2>Ваше прізвище: {props.user.lastName}</h2>
    <h2>Ваш вік: {props.user.age}</h2>
    <h2>Ви: диспетчер</h2>
    </div>
</div>
)
}if(props.user.role=='user'){
  return(
    <div className="profile">
    <h1>Ваш профіль</h1>
    <div className="profile-info">
    <h2>Ви увійшли як:  {props.user.login}</h2>
    <h2>Вас звати: {props.user.firstName}</h2>
    <h2>Ваше прізвище: {props.user.lastName}</h2>
    <h2>Ваш вік: {props.user.age}</h2>
    <h2>Ви: користувач</h2>
    </div>
</div>
)
}if(props.user.role=='admin'){
  return(
    <div>
    <h1 className="profile">Ваш профіль</h1>
    <div className="profile-info">
    <h2>Ви увійшли як:  {props.user.login}</h2>
    <h2>Вас звати: {props.user.firstName}</h2>
    <h2>Ваше прізвище: {props.user.lastName}</h2>
    <h2>Ваш вік: {props.user.age}</h2>
    <h2>Ви: головний</h2>
    </div>
</div>
)
}
}
let mapStateToProps = (state) => {
return{
    user: state.auth.currentUser,
    isAuth: state.auth.isAuth
}
}
export default connect(mapStateToProps, null)(ProfilePage);