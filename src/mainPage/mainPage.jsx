import React from "react";
import './mainPage.css'
import { connect } from "react-redux";
import { logOut } from "../api/api";
import { resetCurrentUser } from "../redux/reducers/auth-reducer";
import { NavLink } from "react-router-dom";

const MainPage = (props) => {

    return(
        <div className="main-container">
            <div>
                <h1>Пасажирські перевезення</h1>
                <h2>Швидко, зручно та легко</h2>
                <h3>Детальніше за:</h3>
                <ul>
                    <li>Номером телефону: --------</li>
                    <li>Viber: --------</li>
                    <li>Telegram: --------</li>
                </ul>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return{
        login: state.auth.login
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        resetCurrentUser:()=>dispatch(resetCurrentUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)