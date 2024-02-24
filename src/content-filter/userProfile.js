import { extractFeatures } from './feature_extraction.mjs';

async function createUserProfiles() {
    const tfidf = await extractFeatures();
    // Placeholder for user purchase history; replace with actual data retrieval logic
    const userPurchases = {
        // Example: userId: ['item description 1', 'item description 2', ...]
    };
    const userProfiles = {};
    for (const userId in userPurchases) {
        tfidf.tfidfs(userPurchases[userId], (i, measure) => {
        if (!userProfiles[userId]) {
            userProfiles[userId] = [];
        }
        userProfiles[userId].push(measure);
        });
    }
    return userProfiles;
}

export { createUserProfiles };
