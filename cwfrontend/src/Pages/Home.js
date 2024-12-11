import React from 'react';
import CarouselComponent from '../components/CarouselComponent';
import CustomNavbar from '../components/Navbar'; 
import TicketCard from '../components/TicketCard';
import './home.css';

import image1 from '../images/image1.jpeg';
import image2 from '../images/image2.avif';
import image3 from '../images/event booking.jpg';


export default function Home() {
  const slides = [
    {
      src: image1,
      alt: 'First slide',
    },
    {
      src: image2,
      alt: 'Second slide label',
    },
    {
      src: image3,
      alt: 'Third slide label',
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
