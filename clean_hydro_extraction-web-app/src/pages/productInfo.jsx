// components/ProductInfo.jsx
import React from 'react';
import '../styles/productInfo.css';
import { useParams } from 'react-router-dom';
import { productItems } from '../data/productItems';
import NavBar from '../components/navBar';
import ProductCard from '../components/productCard';

const ProductInfo = () => { 
  const { id } = useParams();

  console.log(id)
  console.log(productItems[id].categories)

  const related = Object.values(productItems).filter(p =>
    p.id !== id &&
    p.categories.some(cat => productItems[id].categories.includes(cat))
  );

  
  // Replace with real fetch if needed
  return (
    <>
    <NavBar />

          <div className="product-details-container">
        <div className="product-top">
          <img src={productItems[id].image.replace('150', '300')} alt={productItems[id].name} className="product-image" />
          <div className="product-info">
            <h1>{productItems[id].name}</h1>

            <h3>Description</h3>
            <p>{productItems[id].desc}</p>

            <h4>Categories</h4>
            <div className="categories">
              {productItems[id].categories.map((cat, idx) => (
                <span key={idx} className="category-chip">{cat}</span>
              ))}
            </div>
          </div>
        </div>

        <hr className="divider" />

        <h3 className="related-title">Related Products</h3>
        <div className="related-grid">
          {related.map((item, idx) => (
            <ProductCard key={idx} item={item}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
