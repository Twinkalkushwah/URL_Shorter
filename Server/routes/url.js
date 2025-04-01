const express = require("express");
const { auth } = require("../middlewares/auth");
const { Url } = require("../models/url.model");
const { nanoid } = require("nanoid");

const urlRouter = express.Router();

urlRouter.get("/recents", auth, async (req, res) => {
  try {
    const recent = await Url.find({ user: req.user._id, time: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } });
    res.status(200).json({ message: "Recent URLs", recent, isOk: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", isOk: false });
  }
});

urlRouter.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortUrl = nanoid(8); // Generate a short ID

    const newUrl = new Url({ originalUrl, shortUrl });
    await newUrl.save();

    // Manually set BASE_URL if process.env.BASE_URL is missing
    const baseUrl = process.env.BASE_URL || "http://localhost:8808";

    // return res.json({ isOk: true, newUrl: `${baseUrl}/${shortUrl}` });
    return res.json({ isOk: true, newUrl: shortUrl });

  } catch (error) {
    console.error("Error generating short URL:", error);
    return res.status(500).json({ message: "Unable to generate short URL", isOk: false });
  }
});

// Add this DELETE route to your urlRouter
urlRouter.delete("/delete/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    
    // Find the URL by shortUrl and delete it
    const deletedUrl = await Url.findOneAndDelete({ shortUrl });

    if (!deletedUrl) {
      return res.status(404).json({ success: false, message: "URL not found" });
    }

    res.status(200).json({ success: true, message: "URL removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


urlRouter.get("/history", auth, async (req, res) => {
  try {
    const history = await Url.find({ user: req.user._id });
    res.status(200).json({ message: "History", history, isOk: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", isOk: false });
  }
});

module.exports = { urlRouter };
