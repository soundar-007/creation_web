require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://creation-be66u7upy-soundars-projects-74e26c24.vercel.app/",
  ],
  methods: "GET,POST",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("--------Connected to DB-------");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 3002;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
