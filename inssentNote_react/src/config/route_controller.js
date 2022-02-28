import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';



function RouteController (props) {
  const { Component } = props;
  const [auth, setAuth] = useState(localStorage.getItem('auth'));
  useEffect(()=> {
      setAuth(localStorage.getItem('auth'));
  }, []);
  console.log('auth', auth)
  const show = () => {
    if (auth === 'true') {
      return <Component/>
    } else {
      alert('ALERT: You Are Not Logged. \nPlease Log Your Acount.')
      return <Navigate to="/"/>
    }
  }
  return show()
};

export default RouteController