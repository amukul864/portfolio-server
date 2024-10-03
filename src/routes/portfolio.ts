import { Router } from "express";
import authMiddleware from "../middleware/auth";
import {
  contactDetail,
  getPortfolio,
  personalInfo,
  profile,
  skill,
  work,
} from "../controllers/portfolio";
import upload from "../utils/upload";

const router = Router();

router.get("/", getPortfolio);

router.post("/skill", authMiddleware, upload.none(), skill);

router.post("/work", authMiddleware, upload.array("assetsWork"), work);

router.post("/personal-info", authMiddleware, upload.none(), personalInfo);

router.post("/profile", authMiddleware, upload.none(), profile);

router.post("/contact-detail", upload.none(), contactDetail);

export default router;
