import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./CategoryCard.css";

const CategoryCard = ({category}) => {
 const images = category.categoryImage;
 const categoryPath = `/categories/${category.name.toLowerCase()}`; // Create the path

 return (
    <Link to={categoryPath}> {/* Use Link to wrap the div */}
      <div className='CategoryCards'>
        <figure>
          <img className='CategoryImages' src={`http://localhost:4000/${images}`} alt="Mountains" />
          <figcaption>{category.name}</figcaption>
        </figure>
      </div>
    </Link>
 );
};

export default CategoryCard;
