import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.3.0/dist/transformers.min.js';

let summarizer = null;

self.onmessage = async (e) => {
  if (e.data === 'load') {
    try {
      summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6', {
        quantized: true,
        use_browser_cache: true,
        cache_dir: 'indexeddb://summarizer'
      });
      self.postMessage({ status: 'ready' });
    } catch (err) {
      self.postMessage({ status: 'error', error: err.toString() });
    }
  }

  if (e.data?.type === 'summarize') {
    try {
      const result = await summarizer(e.data.payload, { max_new_tokens: 100 });
      self.postMessage({ status: 'summary', result: result[0].summary_text });
    } catch (err) {
      self.postMessage({ status: 'error', error: err.toString() });
    }
  }
};
