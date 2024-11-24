const axios = require('axios');
const cheerio = require('cheerio');

const getWordCount = async (url) => {
  try {
   
    if (!/^https?:\/\//.test(url)) {
      throw new Error('Invalid URL. Please provide a valid HTTP/HTTPS URL.');
    }

    const response = await axios.get(url, { timeout: 5000 });
    if (response.status !== 200) {
      throw new Error(`Failed to fetch URL. HTTP Status: ${response.status}`);
    }

    const $ = cheerio.load(response.data);

    const meaningfulTags = 'p, h1, h2, h3, h4, h5, h6, li, blockquote, span, div';
    const excludedTags = 'script, style, noscript, iframe';

    let text = '';

    $(meaningfulTags).each((_, el) => {
      const parent = $(el).closest(excludedTags);
      if (parent.length === 0) { 
        const elementText = $(el).text().trim();
        if (elementText) {
          text += ` ${elementText}`;
        }
      }
    });

    const wordCount = text.split(/\s+/).filter(Boolean).length;
    return wordCount;

  } catch (error) {
    console.error('Error fetching website content:', error.message);
    throw new Error('Error fetching website content');
  }
};



module.exports={
    getWordCount
}