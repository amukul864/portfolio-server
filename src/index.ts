import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import portfolioRoute from "./routes/portfolio";
import helmet from "helmet";
const xssClean = require("xss-clean");
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import Portfolio from "./models/portfolio";
import IPortfolio from "./utils/interfaces/portfolio";
import path = require("path");

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(hpp());

app.use(xssClean());

app.use(
  mongoSanitize({
    replaceWith: "_",
  }),
);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existingPortfolio = await Portfolio.findOne({
      id: process.env.PRIVATE_KEY,
    });
    if (!existingPortfolio) {
      const portfolio: IPortfolio = {
        id: process.env.PRIVATE_KEY,
        works: [],
        contactDetails: [],
        skills: [],
        profiles: [],
        personalInfo: { label: ` `, heading: [], subHeading: [], email: [] },
      };
      await new Portfolio(portfolio).save();
    }
  } catch (err) {
    throw new Error(err as string);
  }
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/portfolio", portfolioRoute);

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    app.listen(process.env.PORT || 5000, async () => {
      console.log("connected");
    });
  })
  .catch((err: Error) => {
    console.log(err);
  });
