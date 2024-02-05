import React from 'react';
import './SidebarComponent.css';

const Sidebar = ({ brands, onFilterChange, filters }) => {



 const handleIntervalSelection = (event, interval) => {
    const isChecked = event.target.checked;
    onFilterChange({ priceIntervals: isChecked ? interval : null });
 };

 return (
    <div className="sidebar">
      <h2>Filters</h2>
      <h4>Brands</h4>
      {brands.map((brand, index) => (
        <label key={index}>
          <input
            type="checkbox"
            onChange={(event) => onFilterChange({ brand: event.target.checked ? brand.name : null })}
          />
          {brand.name} {/* Assuming each brand object has a 'name' property */}
        </label>
      ))}

    </div>
 );
};

export default Sidebar;
