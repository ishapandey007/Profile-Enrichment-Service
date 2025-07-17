const { scrapeFullName } = require("../utils/scraper");
const { generateUserPDF } = require("../services/pdfService");


const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.enrichUser = async (req, res) => {
  try {
    const { username, email, profileUrl } = req.body;

    if (!username || !email || !profileUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const fullName = await scrapeFullName(profileUrl);

    const enrichedUser = {
      username,
      email,
      fullName,
      sourceProfile: profileUrl,
    };

    console.log("User saved:", enrichedUser);
    generateUserPDF(enrichedUser);

    return res.status(201).json(enrichedUser);
  } catch (error) {
    console.error("Enrichment error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
