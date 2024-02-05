import React, { useState } from "react";
import "./ProductComponent.css";
import { Carousel } from 'react-responsive-carousel';

const ProductComponent = ({ product, onDataFromChild }) => {
 if (!product || !product.details || !product.categories || !product.brand) {
    return null;
 }

 const { productName, description } = product;
 const { price, deal, dealPrice, quantity, images, storage, ram, sim, color } = product.details[0];
 const categoryName = product.categories[0].name;
 const brand = product.brand.name;
 const productID = product._id;

 const sendDataToParent = () => {
    onDataFromChild(productID);
 };

 const [selectedImageIndex, setSelectedImageIndex] = useState(0);

 const handleImageClick = (index) => {
    setSelectedImageIndex(index);
 };

 const DealPrice = () => {
    if (deal) {
      return dealPrice !== undefined && dealPrice !== 0 ? (
        <ul className="productDescription productDealPrice">
          Deal Price: {dealPrice}$
        </ul>
      ) : null;
    }
    return null;
 };

 return (
    <div className="mainProductComponent">
      <Carousel className="imageContainer"
        selectedItem={selectedImageIndex}
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        emulateTouch={false}
        swipeable={false}
        autoPlay={true}
        interval={3000}
        renderIndicator={() => null} // This line removes the dots
        infiniteLoop={true}
        onChange={setSelectedImageIndex}
      >
        {images && images.map((image, index) => (
          <div classNmae="mainDivImage" key={index}>
            <img
              className="imageProductComponent"
              src={`http://localhost:4000/images/${image}`}
              alt={`Image ${index}`}
            />
            <button className="overlayButtonProduct" onClick={sendDataToParent}>
              View Details
            </button>
          </div>
        ))}
      </Carousel>
      <div className="descriptionProductComponent">
        <ul className="productDescription productName">
          <h3>{productName}</h3>
        </ul>
        <ul className="productDescription productDeal">{brand}</ul>
        <ul className="productDescription">{categoryName}</ul>
        <ul className={`productDescription productPrice${deal ? " deal" : ""}`}>
          Price: {price}$
        </ul>
        {DealPrice()}
        <ul className="productDescription productDescription">{description}</ul>
      </div>
    </div>
 );
};

export default ProductComponent;
