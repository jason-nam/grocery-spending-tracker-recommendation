const { generateRecommendations, simulateProductPurchase } = require('./recommendations');

// Simulate a user with id 'user123' buying 'product1'
simulateProductPurchase('user123', 'product1');

// Now generate recommendations for 'user123'
const recommendations = generateRecommendations('user123');
console.log(recommendations);
