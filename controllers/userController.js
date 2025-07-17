const { scrapeFullName } = require("../utils/scraper");
const { generateUserPDF } = require("../services/pdfService");

exports.enrichUser = async (req, res) => {
  try {
    const { username, email, profileUrl } = req.body;

    if (!username || !email || !profileUrl) {
      return res.status(400).json({ message: "Missing required fields" });
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

    res.status(201).json(enrichedUser);
  } catch (error) {
    console.error("Error enriching user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
