import React from 'react'
import Loging from '../components/Loging'
import CustomNavbar from '../components/Navbar'; 
import './logingPage.css';


export default function LogingPage() {
  return (
    <>
        <CustomNavbar />
    <div className='logingcss'>
        <Loging CorV="Customer Login"/>
    </div></>

  )
}
