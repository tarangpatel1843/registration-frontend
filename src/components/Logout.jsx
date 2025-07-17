import React, { useContext, useEffect } from 'react';
import Ct from './Ct';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  let obj = useContext(Ct)
  let navigate = useNavigate()
  useEffect(() => {
    obj.updstore({ "token": "", "name": "" })
    navigate("/login")
  }, [])
  return (
    <div>logout</div>
  );
}

export default Logout;
