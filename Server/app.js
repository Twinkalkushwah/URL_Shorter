const express = require("express");
const bodyParser = require("body-parser");
const { dataBaseConnection } = require("./databases/DB");
const { authRouter } = require("./routes/auth");
const dotenv = require("dotenv");
const { urlRouter } = require("./routes/url");
const { Url } = require("./models/url.model");
dotenv.config();
const cors = require("cors");

const app = express();
// app.use(cors());
app.use(
  cors({
    origin: "https://url-shorter-sand.vercel.app", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//Handle Preflight Requests  

app.options("*", cors()); 

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Home Page" });
});


app.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;

    if (!shortUrl) {
      return res.status(400).json({ message: "Invalid URL ID", isOk: false });
    }

    const url = await Url.findOne({ shortUrl });
    if (!url) {
      return res.status(404).json({ message: "URL not found", isOk: false });
    }

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", isOk: false });
  }
});


app.use("/api/auth", authRouter);
app.use("/api/url", urlRouter);

app.listen(process.env.PORT, async () => {
  try {
    await dataBaseConnection();
    console.log("-- Connected to Database --");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
  console.log(`-- Server is running on PORT ${process.env.PORT} --`);
});
