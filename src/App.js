import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './auth/login';
import MainPage from './mainPage/mainPage';
import { connect } from 'react-redux';
import ProfilePage from './profile/profile';
import Header from './header/header';
import Users from './users/users';
import Drive from './drives/drive';
import DispInterface from './dispatcher/dispatcherMenu';



function App(props) {
  if(props.isAuth==false){
    return(
      <BrowserRouter>
      <div className='app-wrapper'>
      <div className='app-wrapper-content'>
      <Routes>
      <Route path='/' element={<Login/>}/>
      </Routes>
      </div>
      </div>
      </BrowserRouter>
      )
    }else{
    return (
      <BrowserRouter>
      <div className='app-wrapper'>
        <div className='app-wrapper-content'>
          <Header/>
        <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/profile-form' element={<ProfilePage/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/drive' element={<Drive/>}/>
        <Route path='/dispatchers' element={<DispInterface/>}/>
        </Routes>
        </div>
        </div>
        </BrowserRouter>
    );
  }
}

let mapStateToProps = (state) => {
  return{
      isAuth: state.auth.isAuth
  }
}
export default connect(mapStateToProps, null)(App);
