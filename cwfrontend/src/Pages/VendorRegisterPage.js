import React from 'react'
import Loging from '../components/Loging'
import CustomNavbar from '../components/Navbar'; 
import './logingPage.css';

export default function VendorRegisterPage() {
  return (
    <>
    <CustomNavbar />
<div className='logingcss'>
    <Loging CorV="Vendor Register" loginPath="/venderlogin" registerPath="/venderregister"/>
</div>
</>
  )
}
