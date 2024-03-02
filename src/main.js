import pg from 'pg';
const { Pool } = pg;

// Connection details for your database
const pool = new Pool({
    user: 'your_username',
    host: 'your_host',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});

/**
 * Function to get frequently purchased items for a user
 * @param {number} userId 
 * @returns {Promise<Array<object>>}
 */
async function getFrequentlyPurchasedItems(userId) {
    try {
        const client = await pool.connect();
        const query = `
            SELECT item_key, item_desc, count(*) AS frequency
            FROM classifiedItems
            WHERE trip_id IN (
            SELECT trip_id
            FROM trips
            WHERE user_id = $1
            )
            GROUP BY item_key, item_desc
            ORDER BY frequency DESC
            LIMIT 10;
        `;
        const result = await client.query(query, [userId]);
        client.release();
    
        if (!result.rows.length) {
            return [];
        }
    
        return result.rows;
    } catch (error) {
        console.error('Error fetching frequently purchased items:', error);
        return [];
    }
}

/**
 * Function to get frequently purchased items for a user
 * @returns {Promise<Array<object>>}
 */
async function getPopularItems() {
    try {
        const client = await pool.connect();
        const query = `
            SELECT item_key, item_desc, count(*) AS frequency
            FROM classifiedItems
            GROUP BY item_key, item_desc
            ORDER BY frequency DESC
            LIMIT 10;
        `;
        const result = await client.query(query);
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error fetching popular items:', error);
        return [];
    }
}
  
/**
 * Function to recommend items based on frequently purchased items
 * @param {number} userId
 * @returns {Promise<Array<object>>}
 */
async function recommendItems(userId) {
    const frequentlyPurchased = await getFrequentlyPurchasedItems(userId);
    if (!frequentlyPurchased.length) {
        return await getPopularItems();
    }

    return frequentlyPurchased.slice(0, 3);
}

(async () => {
    const userId = 1; 
    const recommendations = await recommendItems(userId);
    console.log('Recommended items:', recommendations);
})();

export { recommendItems };
