import { createUserProfiles } from './user_profile.mjs';
import { extractFeatures } from './feature_extraction.mjs';

function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0.0;
    let normA = 0.0;
    let normB = 0.0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] ** 2;
        normB += vecB[i] ** 2;
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function recommendItems(userId) {
    const userProfiles = await createUserProfiles();
    const userProfile = userProfiles[userId];
    const tfidf = await extractFeatures();
    const recommendations = [];

    tfidf.documents.forEach((doc, index) => {
        const similarity = cosineSimilarity(userProfile, doc.__tfidf); // Assuming doc.__tfidf is the TF-IDF vector
        recommendations.push({ docIndex: index, score: similarity });
    });

    // Sort recommendations by score in descending order
    recommendations.sort((a, b) => b.score - a.score);
    return recommendations.slice(0, 5); // Top 5 recommendations
}

export { recommendItems };
