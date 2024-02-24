import TfIdf from 'node-tfidf';
import { loadData } from './data_preprocessing.mjs'; // Adjust the path as necessary

async function extractFeatures() {
    const data = await loadData();
    const tfidf = new TfIdf();
    data.forEach(item => {
        tfidf.addDocument(item.item_desc);
    });
    return tfidf;
}

export { extractFeatures };
