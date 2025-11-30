import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Food Images
const IMAGES = {
  pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
  cake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop',
  drink: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop',
  sushi: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&auto=format&fit=crop',
  ramen: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop',
  taco: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&auto=format&fit=crop',
  hero1: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop',
  hero2: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&auto=format&fit=crop',
  hero3: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1200&auto=format&fit=crop',
  chef: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop',
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop'
};

// Contexts
const ThemeContext = createContext();
const CartContext = createContext();
const FavoritesContext = createContext();
const ReviewsContext = createContext();

// Theme Provider
function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Cart Provider
function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id));
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) removeFromCart(id);
    else setCart(cart.map(i => i.id === id ? { ...i, quantity } : i));
  };
  const getTotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Favorites Provider
function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Reviews Provider
function ReviewsProvider({ children }) {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      dishId: 1,
      name: 'Priya Sharma',
      rating: 5,
      review: 'Best Italian food in town! The pasta was absolutely delicious and fresh.',
      image: 'https://i.pravatar.cc/150?img=1',
      date: '2025-01-15'
    },
    {
      id: 2,
      dishId: 5,
      name: 'Rahul Verma',
      rating: 5,
      review: 'Amazing burgers! The meat quality is top-notch. Highly recommended!',
      image: 'https://i.pravatar.cc/150?img=3',
      date: '2025-01-20'
    }
  ]);

  const addReview = (review) => {
    setReviews([...reviews, { ...review, id: Date.now(), date: new Date().toISOString().split('T')[0] }]);
  };

  const getReviewsByDish = (dishId) => reviews.filter(r => r.dishId === dishId);
  const getAverageRating = (dishId) => {
    const dishReviews = getReviewsByDish(dishId);
    if (dishReviews.length === 0) return 0;
    return (dishReviews.reduce((sum, r) => sum + r.rating, 0) / dishReviews.length).toFixed(1);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getReviewsByDish, getAverageRating }}>
      {children}
    </ReviewsContext.Provider>
  );
}

// Menu Items Data
const MENU_ITEMS = [
  { id: 1, name: 'Margherita Pizza', category: 'pizza', price: 299, image: IMAGES.pizza, diet: 'veg', rating: 4.8, description: 'Classic Italian pizza with fresh mozzarella' },
  { id: 2, name: 'Pepperoni Pizza', category: 'pizza', price: 399, image: IMAGES.pizza, diet: 'non-veg', rating: 4.9, description: 'Loaded with pepperoni and cheese' },
  { id: 3, name: 'Alfredo Pasta', category: 'pasta', price: 249, image: IMAGES.pasta, diet: 'veg', rating: 4.7, description: 'Creamy Alfredo sauce with fettuccine' },
  { id: 4, name: 'Penne Arrabiata', category: 'pasta', price: 229, image: IMAGES.pasta, diet: 'veg', rating: 4.6, description: 'Spicy tomato sauce pasta' },
  { id: 5, name: 'Classic Burger', category: 'burger', price: 199, image: IMAGES.burger, diet: 'non-veg', rating: 4.8, description: 'Juicy beef patty with fresh veggies' },
  { id: 6, name: 'Veggie Burger', category: 'burger', price: 179, image: IMAGES.burger, diet: 'veg', rating: 4.5, description: 'Healthy veggie patty burger' },
  { id: 7, name: 'Caesar Salad', category: 'salad', price: 179, image: IMAGES.salad, diet: 'veg', rating: 4.5, description: 'Fresh romaine with Caesar dressing' },
  { id: 8, name: 'Chocolate Cake', category: 'dessert', price: 159, image: IMAGES.cake, diet: 'veg', rating: 4.9, description: 'Rich chocolate layer cake' },
  { id: 9, name: 'Sushi Platter', category: 'sushi', price: 499, image: IMAGES.sushi, diet: 'non-veg', rating: 4.8, description: 'Assorted fresh sushi rolls' },
  { id: 10, name: 'Ramen Bowl', category: 'ramen', price: 349, image: IMAGES.ramen, diet: 'non-veg', rating: 4.7, description: 'Traditional Japanese ramen' },
  { id: 11, name: 'Tacos', category: 'mexican', price: 259, image: IMAGES.taco, diet: 'non-veg', rating: 4.6, description: 'Authentic Mexican tacos' },
  { id: 12, name: 'Mojito', category: 'drinks', price: 129, image: IMAGES.drink, diet: 'veg', rating: 4.7, description: 'Refreshing mint mojito' }
];

// Home Component with Slider
function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { darkMode } = useContext(ThemeContext);
  const slides = [
    { image: IMAGES.hero1, title: 'Taste That Brings You Back', subtitle: 'Experience culinary excellence' },
    { image: IMAGES.hero2, title: 'Fresh Ingredients Daily', subtitle: 'Farm to table experience' },
    { image: IMAGES.hero3, title: 'Crafted With Love', subtitle: 'By expert chefs' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page">
      {/* Hero Slider */}
      <section className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <Link to="/menu" className="cta-button">Explore Menu 🍽️</Link>
            </div>
          </div>
        ))}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      <SpecialOffers />
      <PopularDishes />
      <ChefSpecial />
      <CustomerReviews />
      <Newsletter />
    </div>
  );
}

// Popular Dishes Component
function PopularDishes() {
  const popularDishes = MENU_ITEMS.slice(0, 3);

  return (
    <section className="dishes-section">
      <div className="container">
        <h2 className="section-title">Popular Dishes</h2>
        <div className="title-underline"></div>
        <div className="dishes-grid">
          {popularDishes.map((dish, index) => (
            <DishCard key={dish.id} dish={dish} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Dish Card with Favorites
function DishCard({ dish, index }) {
  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const { getAverageRating } = useContext(ReviewsContext);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const avgRating = getAverageRating(dish.id) || dish.rating;

  return (
    <div className="dish-card" style={{ animationDelay: `${index * 200}ms` }}>
      <div className="dish-image-container">
        <img src={dish.image} alt={dish.name} className="dish-image-real" />
        <button 
          className={`favorite-button ${isFavorite(dish.id) ? 'active' : ''}`}
          onClick={() => toggleFavorite(dish.id)}
        >
          {isFavorite(dish.id) ? '❤️' : '🤍'}
        </button>
        <span className="diet-badge">{dish.diet === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}</span>
      </div>
      <div className="dish-content">
        <div className="dish-header">
          <h3 className="dish-name">{dish.name}</h3>
          <span className="dish-rating">⭐ {avgRating}</span>
        </div>
        <p className="dish-description">{dish.description}</p>
        <p className="dish-price">₹{dish.price}</p>
        <button 
          className={`order-button ${added ? 'added' : ''}`}
          onClick={handleAddToCart}
        >
          {added ? '✅ Added!' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
}

// Menu Page with Search & Filters
function Menu() {
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [dietFilter, setDietFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and search logic
  let filteredItems = MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesDiet = dietFilter === 'all' || item.diet === dietFilter;
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesFavorites = activeCategory === 'favorites' ? favorites.includes(item.id) : true;
    
    return matchesSearch && (activeCategory === 'favorites' ? matchesFavorites : matchesCategory) && matchesDiet && matchesPrice;
  });

  // Sort logic
  if (sortBy === 'price-low') {
    filteredItems.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredItems.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredItems.sort((a, b) => b.rating - a.rating);
  }

  const categories = ['all', 'favorites', ...new Set(MENU_ITEMS.map(item => item.category))];

  return (
    <div className="page menu-page">
      <div className="container">
        <h1 className="page-title">Our Menu</h1>
        <div className="title-underline"></div>

        {/* Floating Cart */}
        <Link to="/cart" className="floating-cart">
          🛒 <span className="cart-count">{cart.length}</span>
        </Link>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? '✕ Close Filters' : '⚙️ Filters'}
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label className="filter-label">Diet Type:</label>
              <div className="filter-buttons">
                {['all', 'veg', 'non-veg'].map(diet => (
                  <button
                    key={diet}
                    className={`filter-btn ${dietFilter === diet ? 'active' : ''}`}
                    onClick={() => setDietFilter(diet)}
                  >
                    {diet === 'all' ? 'All' : diet === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
              <input
                type="range"
                min="0"
                max="500"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="price-slider"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Sort By:</label>
              <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
            >
              {category === 'favorites' ? '❤️ Favorites' : category.charAt(0).toUpperCase() + category.slice(1)}
              {category === 'favorites' && favorites.length > 0 && ` (${favorites.length})`}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="results-info">
          Found {filteredItems.length} {filteredItems.length === 1 ? 'dish' : 'dishes'}
        </div>

        {/* Menu Grid */}
        <div className="menu-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No dishes found</h3>
              <p>Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Menu Card with Reviews Link
function MenuCard({ item, index }) {
  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const { getAverageRating, getReviewsByDish } = useContext(ReviewsContext);
  const [added, setAdded] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const avgRating = getAverageRating(item.id) || item.rating;
  const reviewCount = getReviewsByDish(item.id).length;

  return (
    <>
      <div className="menu-card" style={{ animationDelay: `${index * 100}ms` }}>
        <div className="menu-image-container">
          <img src={item.image} alt={item.name} className="menu-image-real" />
          <button 
            className={`favorite-button ${isFavorite(item.id) ? 'active' : ''}`}
            onClick={() => toggleFavorite(item.id)}
          >
            {isFavorite(item.id) ? '❤️' : '🤍'}
          </button>
          <span className="diet-badge">{item.diet === 'veg' ? '🟢' : '🔴'}</span>
        </div>
        <div className="menu-content">
          <div className="menu-header">
            <h3 className="menu-name">{item.name}</h3>
            <button 
              className="rating-button"
              onClick={() => setShowReviews(true)}
            >
              ⭐ {avgRating} ({reviewCount})
            </button>
          </div>
          <p className="menu-description">{item.description}</p>
          <p className="menu-price">₹{item.price}</p>
          <button 
            className={`add-cart-button ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? '✅ Added!' : '🛒 Add to Cart'}
          </button>
        </div>
      </div>

      {/* Review Modal */}
      {showReviews && (
        <ReviewModal 
          dish={item} 
          onClose={() => setShowReviews(false)} 
        />
      )}
    </>
  );
}

// Review Modal Component
function ReviewModal({ dish, onClose }) {
  const { getReviewsByDish, addReview } = useContext(ReviewsContext);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    review: ''
  });

  const reviews = getReviewsByDish(dish.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview({
      ...newReview,
      dishId: dish.id,
      image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    });
    setNewReview({ name: '', rating: 5, review: '' });
    setShowAddReview(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <img src={dish.image} alt={dish.name} className="modal-dish-image" />
          <div>
            <h2>{dish.name}</h2>
            <p className="modal-dish-price">₹{dish.price}</p>
          </div>
        </div>

        <div className="reviews-container">
          <div className="reviews-header">
            <h3>Customer Reviews ({reviews.length})</h3>
            <button className="add-review-btn" onClick={() => setShowAddReview(!showAddReview)}>
              {showAddReview ? 'Cancel' : '+ Add Review'}
            </button>
          </div>

          {showAddReview && (
            <form className="add-review-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={newReview.name}
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                required
              />
              <div className="rating-input">
                <label>Rating:</label>
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={star <= newReview.rating ? 'star-active' : ''}
                    onClick={() => setNewReview({...newReview, rating: star})}
                  >
                    ⭐
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Write your review..."
                value={newReview.review}
                onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                rows="4"
                required
              ></textarea>
              <button type="submit" className="submit-review-btn">Submit Review</button>
            </form>
          )}

          <div className="reviews-list">
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review.id} className="review-item">
                  <img src={review.image} alt={review.name} className="review-avatar" />
                  <div className="review-details">
                    <div className="review-header-info">
                      <h4>{review.name}</h4>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <div className="review-rating">
                      {[...Array(review.rating)].map((_, i) => <span key={i}>⭐</span>)}
                    </div>
                    <p className="review-text">"{review.review}"</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-reviews">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Special Offers Component
function SpecialOffers() {
  const offers = [
    { title: 'Weekend Special', discount: '20% OFF', code: 'WEEKEND20', color: 'offer-orange' },
    { title: 'Family Combo', discount: 'Buy 2 Get 1', code: 'FAMILY3', color: 'offer-red' },
    { title: 'Lunch Deal', discount: '₹199 Only', code: 'LUNCH199', color: 'offer-green' }
  ];

  return (
    <section className="offers-section">
      <div className="container">
        <h2 className="section-title">Special Offers 🎁</h2>
        <div className="title-underline"></div>
        <div className="offers-grid">
          {offers.map((offer, index) => (
            <div key={index} className={`offer-card ${offer.color}`}>
              <div className="offer-badge">HOT DEAL</div>
              <h3 className="offer-title">{offer.title}</h3>
              <div className="offer-discount">{offer.discount}</div>
              <div className="offer-code">Code: {offer.code}</div>
              <button className="offer-button">Order Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Chef's Special Component
function ChefSpecial() {
  return (
    <section className="chef-special-section">
      <div className="container">
        <div className="chef-special-grid">
          <div className="chef-image-container">
            <img src={IMAGES.chef} alt="Chef" className="chef-image" />
          </div>
          <div className="chef-content">
            <span className="chef-badge">👨‍🍳 Chef's Recommendation</span>
            <h2 className="chef-title">Today's Special</h2>
            <h3 className="special-dish-name">Truffle Mushroom Risotto</h3>
            <p className="chef-description">
              A luxurious Italian dish featuring arborio rice slow-cooked to creamy perfection 
              with wild mushrooms, truffle oil, and parmesan cheese.
            </p>
            <div className="special-features">
              <div className="feature-item">⭐ Chef's Favorite</div>
              <div className="feature-item">🔥 Limited Today</div>
              <div className="feature-item">💯 Highly Rated</div>
            </div>
            <div className="special-price">
              <span className="original-price">₹699</span>
              <span className="special-price-amount">₹499</span>
            </div>
            <button className="special-order-button">Order Special Dish</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Customer Reviews Component
function CustomerReviews() {
  const { reviews } = useContext(ReviewsContext);
  const recentReviews = reviews.slice(-3);

  return (
    <section className="reviews-section">
      <div className="container">
        <h2 className="section-title">Customer Reviews ⭐</h2>
        <div className="title-underline"></div>
        <div className="reviews-grid">
          {recentReviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <img src={review.image} alt={review.name} className="reviewer-image" />
                <div className="reviewer-info">
                  <h4 className="reviewer-name">{review.name}</h4>
                  <div className="review-rating">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-text">"{review.review}"</p>
              <div className="review-dish">Date: {review.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Newsletter Component
function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Subscribe to Our Newsletter 📧</h2>
          <p className="newsletter-subtitle">Get special offers and updates directly to your inbox!</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
          {subscribed && <div className="newsletter-success">✅ Successfully subscribed!</div>}
        </div>
      </div>
    </section>
  );
}

// Shopping Cart Page
function ShoppingCart() {
  const { cart, removeFromCart, updateQuantity, getTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="page cart-page">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some delicious items to get started!</p>
            <Link to="/menu" className="continue-shopping">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart 🛒</h1>
        <div className="title-underline"></div>

        <div className="cart-grid">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">₹{item.price}</p>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="cart-item-total">₹{item.price * item.quantity}</div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{getTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery:</span>
              <span>₹49</span>
            </div>
            <div className="summary-row">
              <span>Tax (5%):</span>
              <span>₹{Math.round(getTotal() * 0.05)}</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>₹{getTotal() + 49 + Math.round(getTotal() * 0.05)}</span>
            </div>
            <Link to="/checkout" className="checkout-button">Proceed to Checkout</Link>
            <Link to="/menu" className="continue-shopping-link">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reservation, Gallery, Contact, About pages (keeping previous versions)
function Reservation() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '2', occasion: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '2', occasion: '' });
    }, 3000);
  };

  return (
    <div className="page reservation-page">
      <div className="container">
        <h1 className="page-title">Reserve a Table 📅</h1>
        <div className="title-underline"></div>

        <div className="reservation-grid">
          <div className="reservation-info">
            <h2 className="reservation-heading">Book Your Experience</h2>
            <p className="reservation-text">
              Reserve your table at MyRestaurant and enjoy an unforgettable dining experience!
            </p>
            <div className="reservation-features">
              <div className="feature-item">✅ Instant Confirmation</div>
              <div className="feature-item">🎉 Special Occasions</div>
              <div className="feature-item">👨‍👩‍👧‍👦 Family Friendly</div>
              <div className="feature-item">🍷 Premium Dining</div>
            </div>
            <img src={IMAGES.restaurant} alt="Restaurant" className="reservation-image" />
          </div>

          <form className="reservation-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input type="text" className="form-input" placeholder="Your Name" 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input type="email" className="form-input" placeholder="your@email.com" 
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input type="tel" className="form-input" placeholder="+91 1234567890" 
                  value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Guests *</label>
                <select className="form-input" value={formData.guests} 
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}>
                  {[1,2,3,4,5,6,7,8,9,10].map(num => <option key={num} value={num}>{num}</option>)}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input type="date" className="form-input" value={formData.date} 
                  onChange={(e) => setFormData({...formData, date: e.target.value})} 
                  min={new Date().toISOString().split('T')[0]} required />
              </div>
              <div className="form-group">
                <label className="form-label">Time *</label>
                <input type="time" className="form-input" value={formData.time} 
                  onChange={(e) => setFormData({...formData, time: e.target.value})} required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Special Occasion</label>
              <select className="form-input" value={formData.occasion} 
                onChange={(e) => setFormData({...formData, occasion: e.target.value})}>
                <option value="">Select occasion</option>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="date">Romantic Date</option>
                <option value="business">Business Meeting</option>
              </select>
            </div>

            <button type="submit" className="submit-button">
              {submitted ? '✅ Reservation Confirmed!' : 'Reserve Table'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const galleryImages = [
    { src: IMAGES.pizza, title: 'Delicious Pizza' },
    { src: IMAGES.burger, title: 'Juicy Burger' },
    { src: IMAGES.pasta, title: 'Fresh Pasta' },
    { src: IMAGES.salad, title: 'Healthy Salad' },
    { src: IMAGES.cake, title: 'Sweet Dessert' },
    { src: IMAGES.drink, title: 'Refreshing Drink' },
    { src: IMAGES.sushi, title: 'Sushi Platter' },
    { src: IMAGES.ramen, title: 'Ramen Bowl' },
    { src: IMAGES.taco, title: 'Tasty Tacos' }
  ];

  return (
    <div className="page gallery-page">
      <div className="container">
        <h1 className="page-title">Gallery 📸</h1>
        <div className="title-underline"></div>
        <div className="gallery-grid-images">
          {galleryImages.map((img, index) => (
            <div key={index} className="gallery-item-image" 
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setLightboxImage(img)}>
              <img src={img.src} alt={img.title} />
              <div className="gallery-overlay">
                <span className="gallery-title">{img.title}</span>
                <span className="gallery-zoom">🔍 Click to view</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxImage && (
        <div className="lightbox" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={() => setLightboxImage(null)}>✕</button>
            <img src={lightboxImage.src} alt={lightboxImage.title} />
            <h3 className="lightbox-title">{lightboxImage.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="page contact-page">
      <div className="container">
        <h1 className="page-title">Contact Us 📞</h1>
        <div className="title-underline"></div>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.0!2d79.0882!3d21.1458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA4JzQ1LjAiTiA3OcKwMDUnMTcuNSJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%" height="400" style={{ border: 0, borderRadius: '20px' }}
            allowFullScreen="" loading="lazy"></iframe>
          <button className="map-direction-button">📍 Get Directions</button>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="contact-heading">Get In Touch</h2>
            <div className="contact-items">
              {[
                { icon: '📍', title: 'Address', info: '123 Restaurant Street, Nagpur, Maharashtra' },
                { icon: '📞', title: 'Phone', info: '+91 1234567890' },
                { icon: '📧', title: 'Email', info: 'info@myrestaurant.com' },
                { icon: '⏰', title: 'Hours', info: 'Mon-Sun: 10:00 AM - 11:00 PM' }
              ].map((contact, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-icon">{contact.icon}</div>
                  <div>
                    <h3 className="contact-label">{contact.title}</h3>
                    <p className="contact-text">{contact.info}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="whatsapp-support">
              <h3 className="support-title">💬 Live Chat Support</h3>
              <p className="support-text">Chat with us on WhatsApp!</p>
              <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" 
                className="whatsapp-button">
                <span className="whatsapp-icon">📱</span>Chat on WhatsApp
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-input" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" placeholder="your@email.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea rows="5" className="form-input" placeholder="Your message..." required></textarea>
            </div>
            <button type="submit" className="submit-button">
              {formSubmitted ? '✅ Message Sent!' : 'Send Message 🚀'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="page about-page">
      <div className="container">
        <h1 className="page-title">About Us</h1>
        <div className="title-underline"></div>

        <div className="about-grid">
          <div className="about-image-container">
            <img src={IMAGES.restaurant} alt="Restaurant" className="about-image-real" />
          </div>

          <div className="about-content">
            <h2 className="about-heading">Our Story</h2>
            <p className="about-text">
              Welcome to MyRestaurant, where passion meets flavor! Since 2010, we've been serving 
              the finest dishes crafted with love and the freshest ingredients.
            </p>
            <p className="about-text">
              Our team of expert chefs brings together traditional recipes and modern culinary 
              techniques to create unforgettable dining experiences.
            </p>
            <div className="stats-grid">
              {[
                { number: '15+', label: 'Years Experience' },
                { number: '50K+', label: 'Happy Customers' },
                { number: '150+', label: 'Delicious Dishes' }
              ].map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <ReviewsProvider>
            <Router>
              <AppContent isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            </Router>
          </ReviewsProvider>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

function AppContent({ isMenuOpen, setIsMenuOpen }) {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">MyRestaurant 🍽️</Link>

          <div className="nav-links desktop-menu">
            {[
              { name: 'Home', path: '/' },
              { name: 'Menu', path: '/menu' },
              { name: 'Reservation', path: '/reservation' },
              { name: 'Gallery', path: '/gallery' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map((item) => (
              <Link key={item.name} to={item.path} className="nav-link">{item.name}</Link>
            ))}
            
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          <button className="mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            {[
              { name: 'Home', path: '/' },
              { name: 'Menu', path: '/menu' },
              { name: 'Reservation', path: '/reservation' },
              { name: 'Gallery', path: '/gallery' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map((item) => (
              <Link key={item.name} to={item.path} className="mobile-link" 
                onClick={() => setIsMenuOpen(false)}>{item.name}</Link>
            ))}
            <button className="theme-toggle-mobile" onClick={toggleTheme}>
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        )}
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3 className="footer-heading">MyRestaurant</h3>
              <p className="footer-text">Serving delicious food with love since 2010.</p>
              <div className="social-links">
                {['📘', '📷', '🐦', '📱'].map((icon, index) => (
                  <a key={index} href="#" className="social-link">{icon}</a>
                ))}
              </div>
            </div>
            <div className="footer-section">
              <h3 className="footer-heading">Quick Links</h3>
              <div className="footer-links">
                {['Home', 'Menu', 'Reservation', 'About', 'Contact'].map((item) => (
                  <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="footer-link">{item}</Link>
                ))}
              </div>
            </div>
            <div className="footer-section">
              <h3 className="footer-heading">Contact Info</h3>
              <div className="footer-contact">
                <p>📍 Nagpur, Maharashtra</p>
                <p>📞 +91 1234567890</p>
                <p>📧 info@myrestaurant.com</p>
                <p>⏰ 10 AM - 11 PM</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 MyRestaurant — All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;