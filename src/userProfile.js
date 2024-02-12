const { Client } = require('pg'); // Postgres


// Function to build a user profile from their purchase history
async function buildUserProfile(userId) {
    const profileQuery = `
        SELECT ci.item_brand, COUNT(*) 
        FROM items i 
        JOIN trips t ON i.trip_id = t.trip_id 
        JOIN classifiedItems ci ON i.item_key = ci.item_key 
        WHERE t.user_id = $1 
        GROUP BY ci.item_brand;`;
    
    try {
        const res = await dbClient.query(profileQuery, [userId]);
        const userProfile = {};
        res.rows.forEach(row => {
            userProfile[row.item_brand] = row.count;
        });
        return userProfile;
    } catch (err) {
        console.error('Error building user profile:', err.stack);
        return {};
    }
}

module.exports = { buildUserProfile };

  