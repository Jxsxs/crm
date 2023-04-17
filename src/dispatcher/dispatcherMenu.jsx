import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import './dispatcherMenu.css'
import { db } from "../api/api";
import { collection, doc, getDocs, query, where, deleteDoc} from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Navigate } from "react-router-dom";

const DispInterface = (props) =>{
    const [forms, setForms] = useState([]);
    useEffect(() => {
        async function fetchForms() {
          try {
            const q = query(collection(db, "drives"));
            const querySnapshot = await getDocs(q);
            const usersData = [];
            querySnapshot.forEach((doc) => {
              usersData.push(doc.data());
            });
            setForms(usersData);
          } catch (error) {
            console.log(error);
          }
        }
        fetchForms();
      }, []);
      const formsMap = forms.map(form => {return(<div className="form-card"><div>час: {form.time}</div><div>місто: {form.city}</div>
  <div>звідки їхати: {form.from} - куди їхати: {form.to}</div><div>користувач: {form.user}</div><Button variant='primary' onClick={()=>{deleteDoc(doc(db, 'drives', form.id))}}>заявку розглянено</Button></div>)})
    if(props.user.role != 'admin' || props.user.role != 'dispatcher' || props.isAuth==false){
        return <Navigate to='/' />
    }else{
        return(
            <div>{formsMap}</div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        user: state.auth.currentUser,
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps, null)(DispInterface);