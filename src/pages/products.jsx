
import React, { useRef , useState} from 'react';
import ProductCard from '../components/productCard';
import '../styles/products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/navBar';
import Footer from '../components/footer';
import { productItems } from '../data/productItems';

const Products = () => {
  const sliderRef = useRef(null);
  
  const categories = [  
    'Plastic', 'Metal', 'Glass', 'Paper', 'Organic', 'Wood', 'Cup', 'Straw',
    'Electronic', 'Battery', 'Cardboard', 'Textile', 'Other'
  ];

 const scroll = (direction) => {
    const scrollAmount = 150;
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  
const [selected, setSelected] = useState([]);

const toggleCategory = (category) => {
  setSelected((prev) =>
    prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
  );
};

const filteredItems = Object.values(productItems).filter((item) =>
  selected.length === 0
    ? true
    : selected.every((cat) => item.categories.includes(cat))
);

  return (
    <>
      <NavBar />
      <div className="products-container">
        <h1>Our Waste Products</h1>
        <div className="category-slider-wrapper">
          <button className="nav-btn left" onClick={() => scroll('left')}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div className="category-slider" ref={sliderRef}>
            {categories.map((category, index) => (
              <div key={index}>
              <button key={index} className={selected.includes(category) ? 'category-item active' : 'category-item inactive'}
            onClick={() => toggleCategory(category)}
          >{category}</button>
              </div>
            ))}
          </div>

          <button className="nav-btn right" onClick={() => scroll('right')}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div className="list">
        {(selected.length ? filteredItems : Object.values(productItems)).map((item, index) => (
          <ProductCard key={index} item={item} />
        ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products; 
