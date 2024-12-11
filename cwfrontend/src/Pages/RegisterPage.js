import React from 'react'
import Loging from '../components/Loging'
import CustomNavbar from '../components/Navbar'; 
import './logingPage.css';
import Register from '../components/Register';

export default function RegisterPage() {
  return (
    <>
        <CustomNavbar />
    <div className='logingcss'>
        <Register CorV="Customer Register" registerPath="/register" loginPath="/loging"/>
    </div></>
  )
}
