// ImageSlider.jsx
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ImagesSlider.css'

const ImageSlider = ({ detail, onChange }) => {
 const images = detail.images;  
 console.log(images); // Add this line

 const [selectedImageIndex, setSelectedImageIndex] = useState(0);

 const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    onChange(index);
 };

 // Auto slide functionality
 useEffect(() => {
    let interval;
    if (images) {
      interval = setInterval(() => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        onChange(setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length));
      }, 3000); // Change the interval as needed (in milliseconds)
    }

    return () => clearInterval(interval);
 }, [images]);

 return (
    <div className="slider-container">
      <Carousel
        selectedItem={selectedImageIndex}
        showArrows={true}
        showStatus={false}
        showThumbs={true}
        emulateTouch={true}
        swipeable={true}
        onChange={handleImageClick}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
      >
        {images && images.map((image, index) => (
          <div key={index} className="image-container">
            <img src={`http://localhost:4000/images/${image}`} alt={`Image ${index}`} />
          </div>
        ))}
      </Carousel>
    </div>
 );
};

export default ImageSlider;
