const axios = require("axios");
const cheerio = require("cheerio");

const fixUrl = (url) =>
  url.startsWith("http://") || url.startsWith("https://")
    ? url
    : "https://" + url;

exports.scrapeFullName = async (url) => {
  try {
    const finalUrl = fixUrl(url);
    const { data } = await axios.get(finalUrl);
    const $ = cheerio.load(data);
    const h1Text = $("h1").first().text().trim();
    return h1Text || "Unknown";
  } catch (err) {
    console.error("Scraping failed:", err.message);
    return "Unknown";
  }
};
