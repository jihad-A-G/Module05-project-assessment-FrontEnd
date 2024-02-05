  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import './ProductPageComponent.css';
  import SidebarComponent from '../SidebarComponent/SidebarComponent.jsx';
  import ProductComponent from '../ProductComponent/ProductComponent.jsx';
  import ProductViewComponent from '../ProductViewComponent/ProductViewCoponent.jsx';
  import { useParams } from 'react-router-dom';

  const ProductPage = () => {
    const {categoryIdName} = useParams();
    const status = 'Accepted'
    const captializedCategory= (categoryIdName.charAt(0).toUpperCase() + categoryIdName.slice(1)) || '' ;
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [dataFromChild, setDataFromChild] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
      setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleDataFromChild = (data) => {
      setDataFromChild(data);

      // Fetch details for the selected product
      const selectedProductDetails = products.find((product) => product._id === data);
      setSelectedProduct(selectedProductDetails);
      setIsOpen(true);
  };

  const handleCloseProductView = () => {
      setSelectedProduct(null);
      setIsOpen(false);
  };

    useEffect(() => {
      const fetchProduct = async (categories, anyStatus) => {
        if (!categories) return;
        try {
           // Log the full URL for debugging
           const url = `http://localhost:4000/api/products/?category=${categories}&status=${anyStatus}`;
           console.log('Fetching products from:', url);
       
           const response = await axios.get(url);
           setProducts(response.data);
        } catch (error) {
           console.error("Error fetching company data:", error);
        }
       };

      const fetchBrands = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/brands/`);
          setBrands(response.data);
        } catch (error) {
          console.error("Error fetching brands:", error);
        }
      };

      // Clear the products before fetching new ones
      setProducts([]);
      // Replace 'Laptop' with the actual category
      fetchProduct(captializedCategory ,status);
      fetchBrands(); // Call the function to fetch brands
    }, [captializedCategory]); // Add category as a dependency

  return (
    <div className='productPageContainer'>
    <div className='pageLayout'>
      <SidebarComponent className="sidebarComponentMain"
        brands={brands}
        onFilterChange={handleFilterChange}
        filters={filters}
      />
      <div className='mainContent'>
        <div className='categoryTitle'> {captializedCategory} </div>
        <div className='searchBar'>
          <input type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className='productGrid'>
          {products
            .filter(product => product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
              (!filters.brand || product.brand.name === filters.brand))
            .map((item) => (
              <ProductComponent className="productItem"
                key={item._id}
                product={item}
                onDataFromChild={handleDataFromChild}
              />
            ))}
        </div>
      </div>
    </div>
    <div className='productDetailView'> 
          {selectedProduct && (
            <ProductViewComponent
              className={isOpen ? 'open' : ''}
              product={selectedProduct}
              onClose={handleCloseProductView}
            />
          )}
        </div>
  </div>
  );
  }
  export default ProductPage;
