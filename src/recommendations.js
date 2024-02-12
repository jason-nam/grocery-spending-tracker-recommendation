const { getProductFeaturesForUser } = require('./productFeatures');
const { buildUserProfile } = require('./userProfile');


// Function to generate recommendations
async function generateRecommendations(userId) {
    const userProfile = await buildUserProfile(userId);
    const productFeatures = await getProductFeaturesForUser(userId);
    let recommendations = [];

    // Simplistic recommendation algorithm: recommend items with matching brands
    productFeatures.forEach(product => {
        if (userProfile[product.item_brand]) {
            recommendations.push(product);
        }
    });

    return recommendations;
}

module.exports = { generateRecommendations };
