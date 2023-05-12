import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { db } from "../api/api";
import { doc, setDoc, getDoc, getCountFromServer, getDocs, collection, addDoc } from "firebase/firestore";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import './drive.css'

const Drive = (props) => {

    const[res, setRes] = useState('')
    const[city, setCity] = useState('');
    function cityChange(e) {
        setCity(e.target.value);
      }
    const[from, setFrom] = useState('');
    function fromChange(e) {
        setFrom(e.target.value);
      }
    const[to, setTo] = useState('');
    function toChange(e) {
        setTo(e.target.value);
      }
      const[phone, setPhone] = useState('');
      function phoneChange(e) {
          setPhone(e.target.value);
        }
      const id = uuidv4()

      const formSubmit = () => {
        setDoc(doc(db, "drives", id), {city: city, from: from, to: to, user: props.user.login, phone: phone, time: Date(), id: id});
        setCity('');
        setFrom('');
        setTo('');
        setPhone('');
        setRes('Форма успішно надіслана, очікуйте')
      }
      if(props.auth.isAuth==false){
        return <Navigate to='/'/>
      }else{
        return(
            <div className="drive-container">
                <h1>Оформіть заявку вашої подорожі і наші диспетчери зв'яжуться з вами протягом 3-5хвилин</h1>
                <div className="drive-form">
                  <div>
                    <input type="text" value={city} onChange={cityChange} name="city" placeholder="введіть в якому ви місті"/>
                  </div>
                  <div>
                    <input  type="text" value={from} onChange={fromChange} name="from" placeholder="введіть звідки вам треба їхати"/>
                  </div>
                  <div>
                  <input  type="text" value={to} onChange={toChange} name="to" placeholder="введіть куди вам треба їхати"/>
                  </div>
                  <div>
                  <input  type="text" value={phone} onChange={phoneChange} name="phone" placeholder="введіть ваш номер телефону"/>
                  </div>
                    <p>{res}</p>
                    <Button variant="primary" onClick={formSubmit}>Відправити форму</Button>
                </div>
            </div>
        )
      }
}
let mapStateToProps = (state) => {
    return{
        user: state.auth.currentUser,
        auth: state.auth
    }
}
export default connect(mapStateToProps, null)(Drive);