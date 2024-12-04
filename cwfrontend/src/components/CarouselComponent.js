import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CarouselComponent.css';


export default function CarouselComponent({ slides })  {
  return (
    <Carousel className='imgSlider'>
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
         <img 
            src={slide.src} 
            alt={slide.alt} 
            className="slideImgs" 
          />

          <Carousel.Caption>
            <h3>{slide.label}</h3>
            <p>{slide.text}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>


  );
}
