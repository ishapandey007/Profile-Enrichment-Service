const express = require("express");
const router = express.Router();
const { enrichUser } = require("../controllers/userController");

/**
 * @swagger
 * /users/enrich:
 *   post:
 *     summary: Enrich user profile by scraping full name from given URL
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - profileUrl
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               profileUrl:
 *                 type: string
 *                 example: https://example.com
 *     responses:
 *       201:
 *         description: Enriched user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 fullName:
 *                   type: string
 *                 sourceProfile:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/enrich", enrichUser);

module.exports = router;
