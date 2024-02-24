import { generateRecommendations } from './generateRecommendations';

async function main() {
    const userId = 1; // Assuming a user ID to demonstrate
    const recommendations = await generateRecommendations(userId);
    console.log('Recommendations:', recommendations);
}

main().catch(console.error);
