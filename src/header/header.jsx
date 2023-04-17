import React from "react";
import './header.css';
import { connect } from "react-redux";
import { currentUser, logOut } from "../api/api";
import { resetCurrentUser } from "../redux/reducers/auth-reducer";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import NavbarMenu from "../navbar/navbar";


const Header = (props) => {
    let logOutUser = ()=>{
        logOut();
        props.resetCurrentUser()
    }
    if(props.currentUser.firstName == null){
        return(
            <div className="header-container">
                <NavbarMenu role={props.currentUser.role}/>
                <div className="navbar-icon">
                </div>
                <div className="profile-nav">
                <NavLink to='/profile'>
                <p>{props.currentUser.login}</p>
                <h5>заповніть інформацію про себе!</h5>
                </NavLink>
                <Button variant='primary' onClick={logOutUser}>Log Out</Button>
                </div>
            </div>
        )
    }else{
        return(
            <div className="header-container">
                <NavbarMenu role={props.currentUser.role}/>
                <div className="navbar-icon">
                    <Navbar />
                </div>
                <div className="profile-nav">
                <NavLink to='/profile'>
                <p>{props.currentUser.login}</p>
                </NavLink>
                <Button variant='primary' onClick={logOutUser}>Log Out</Button>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        resetCurrentUser:()=>dispatch(resetCurrentUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)