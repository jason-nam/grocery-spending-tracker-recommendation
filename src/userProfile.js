// User profiles will be built based on interactions with products
let userProfiles = {
    // userId: { featureName: weight, ... },
  };
  
  // Function to update user profile with new product features
  function updateUserProfile(userId, productFeatures) {
    if (!userProfiles[userId]) {
      userProfiles[userId] = {};
    }
  
    for (const [feature, value] of Object.entries(productFeatures)) {
      if (value) {
        if (!userProfiles[userId][feature]) {
          userProfiles[userId][feature] = 0;
        }
        userProfiles[userId][feature] += 1; // Increase the weight if the feature is relevant
      }
    }
  }
  
  // Function to get user profile
  function getUserProfile(userId) {
    return userProfiles[userId] || {};
  }
  
  module.exports = { updateUserProfile, getUserProfile };
  