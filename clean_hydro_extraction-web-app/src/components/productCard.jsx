import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (item) => {
  // console.log(item.item)
    return (
      <>
        <a href={`/product/${item.item.id}`} className="item">  
        <span className="image">
          <img src={item.item.image} alt="image" />
        </span>
        <span className="name">{item.item.name}</span>
        <span className="desc">{item.item.desc}</span>
      </a>
      </>
    );
}

export default ProductCard