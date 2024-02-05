import React from 'react';
import "./HomePageSlider.css"
const HomePageSlider = () => {
  const handleMouseOver = (event) => {
    event.target.classList.add('active');
    document.querySelectorAll('.stage .element:not(.active)').forEach((element) => {
      element.classList.add('inactive');
    });
  };

  const handleMouseLeave = (event) => {
    event.target.classList.remove('active');
    document.querySelectorAll('.stage .element:not(.active)').forEach((element) => {
      element.classList.remove('inactive');
    });
  };

  return (
    <div className='SliderHomePage'>
      <section className="pen">
        <div className="stage">
          <div className="element michael" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}></div>
          <div className="element franklin" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}></div>
          <div className="element trevor" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}></div>
          
        </div>
      </section>
    </div>
  );
};

export default HomePageSlider;
