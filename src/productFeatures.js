import { Client } from 'pg';

// Initialize the database client
const dbClient = new Client({
  // db config
});

dbClient.connect();

// Function to get features of products that a specific user has purchased
async function getProductFeaturesForUser(userId) {
    const query = `
        SELECT DISTINCT ci.item_brand, ci.item_name, ci.item_product_number
        FROM classifiedItems ci
        JOIN items i ON ci.item_key = i.item_key
        JOIN trips t ON i.trip_id = t.trip_id
        WHERE t.user_id = $1;
    `;
    try {
        const res = await dbClient.query(query, [userId]);
        return res.rows; // Returns an array of feature objects for the user's past purchases
    } catch (err) {
        console.error('Error querying product features for user:', err.stack);
        return [];
    }
}

export { getProductFeaturesForUser };
