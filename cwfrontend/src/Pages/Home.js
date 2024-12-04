import React from 'react';
import CarouselComponent from '../components/CarouselComponent';
import CustomNavbar from '../components/Navbar'; 
import TicketCard from '../components/TicketCard';
import './home.css';

import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpeg';


export default function Home() {
  const slides = [
    {
      src: image1,
      alt: 'First slide',
      label: 'First slide label',
      text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
      src: image2,
      alt: 'Second slide label',
      label: 'Second slide label',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      src: image3,
      alt: 'Third slide label',
      label: 'Third slide label',
      text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    }
  ];

  return (
    <>
      <CustomNavbar />
      <CarouselComponent slides={slides} />
      <div className='ticketContainer'>
      <TicketCard/>
      <TicketCard/>
      <TicketCard/>
      <TicketCard/>
      <TicketCard/>
      <TicketCard/>
      <TicketCard/>
      <TicketCard/>
      <TicketCard/>
      <TicketCard/>
      <TicketCard/>
      </div>
      
    </>
  );
}
