// Example structure for product features
const productFeatures = {
    'product1': { organic: true, glutenFree: false, brand: 'BrandA', category: 'Vegetables' },
    'product2': { organic: false, glutenFree: true, brand: 'BrandB', category: 'Bakery' },
    // ... more products
  };
  
  // Function to get product features
  function getProductFeatures(productId) {
    return productFeatures[productId] || {};
  }
  
  module.exports = { getProductFeatures };
  