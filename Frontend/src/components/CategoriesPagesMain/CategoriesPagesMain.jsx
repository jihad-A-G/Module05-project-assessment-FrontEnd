// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AnyCategoryPage from '../ProductPageComponent/ProductPageComponent';
// ... other imports

const CategoriesPagesMain = () => {
 const [categories, setCategories] = useState([]);

 useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
 }, []);

 // Define your routes here, using the categories state
 // ...

 return (
    <Router>
      <Routes>
        {/* ... other routes */}
        {categories.map(category => (
          <Route
            key={category.name}
            path={`products /${category.name.toLowerCase()}`}
            element={<AnyCategoryPage categoryPage={category.name} />}
          />
        ))}
        {/* ... other routes */}
      </Routes>
    </Router>
 );
};

export default CategoriesPagesMain;
