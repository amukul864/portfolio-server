import { NextFunction, Request, Response } from "express";
import Portfolio from "../models/portfolio";
import {
  IContactDetail,
  IPersonalInfo,
  IProfile,
  IWork,
} from "../utils/interfaces/portfolio";
import sendMail from "../utils/sendMail";

export const getPortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const portfolio = await Portfolio.findOne({ id: process.env.PRIVATE_KEY });
    if (portfolio) {
      res.status(200).json(portfolio);
      return;
    } else {
      res.status(404).json({ error: { message: "Portfolio Not Found" } });
      return;
    }
  } catch (err) {
    res.status(500).json({
      error: { message: "Something Went Wrong" },
    });
  }
};

export const skill = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const portfolio = await Portfolio.findOne({ id: process.env.PRIVATE_KEY });
    if (portfolio) {
      portfolio.skills = [req.body.skill as string, ...portfolio.skills];
      await portfolio.save();
      res.status(200).json({ saved: true });
      return;
    } else {
      res.status(404).json({ error: { message: "Portfolio Not Found" } });
      return;
    }
  } catch (err) {
    res.status(500).json({
      error: { message: "Something Went Wrong" },
    });
  }
};

export const work = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const portfolio = await Portfolio.findOne({ id: process.env.PRIVATE_KEY });
    if (portfolio) {
      const liveLinks: string[] = req.body.liveLinksWork;
      const assetLinks: string[] = [];
      for (let i = 0; req.files && i < (req.files.length as number); i++) {
        assetLinks.push(
          `/uploads/${req.body.typeWork}/${req.body.labelWork}/${i}.jpg`,
        );
      }
      const work: IWork = {
        type: req.body.typeWork,
        label: req.body.labelWork,
        shortDescription: req.body.shortDescriptionWork,
        longDescription: req.body.longDescriptionWork,
        sortOrder: portfolio.works.length,
        liveLinks,
        assetLinks,
      };
      portfolio.works.push(work);
      await portfolio.save();
      res.status(200).json({ saved: true });
      return;
    } else {
      res.status(404).json({ error: { message: "Portfolio Not Found" } });
      return;
    }
  } catch (err) {
    res.status(500).json({
      error: { message: "Something Went Wrong" },
    });
  }
};

export const personalInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const personalInfo: IPersonalInfo = {
      label: req.body.labelPersonal ? req.body.labelPersonal : " ",
      heading: req.body.headingPersonal,
      subHeading: req.body.subHeadingPersonal,
      email: req.body.emailPersonal,
    };
    const portfolio = await Portfolio.findOne({ id: process.env.PRIVATE_KEY });
    if (portfolio) {
      portfolio.personalInfo = personalInfo;
      await portfolio.save();
      res.status(200).json({ saved: true });
      return;
    } else {
      res.status(404).json({ error: { message: "Portfolio Not Found" } });
      return;
    }
  } catch (err) {
    res.status(500).json({
      error: { message: "Something Went Wrong" },
    });
  }
};

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profile: IProfile = {
      title: req.body.titleProfile,
      link: req.body.linkProfile,
      description: req.body.descriptionProfile,
    };
    const portfolio = await Portfolio.findOne({ id: process.env.PRIVATE_KEY });
    if (portfolio) {
      portfolio.profiles.push(profile);
      await portfolio.save();
      res.status(200).json({ saved: true });
      return;
    } else {
      res.status(404).json({ error: { message: "Portfolio Not Found" } });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: { message: "Something Went Wrong" },
    });
  }
};

export const contactDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const contactDetail: IContactDetail = {
      title: req.body.title,
      email: req.body.email,
      description: req.body.description,
    };
    const portfolio = await Portfolio.findOne({ id: process.env.PRIVATE_KEY });
    if (portfolio) {
      portfolio.contactDetails.push(contactDetail);
      await portfolio.save();
      sendMail(
        contactDetail.email,
        contactDetail.title,
        `Thanks For Contacting Mukul For -> ${contactDetail.description}`,
        `<b><i>Thanks For Contacting Mukul For -> <br> ${contactDetail.description}</i></b>`,
        "",
      );
      res.status(200).json({ saved: true });
      return;
    } else {
      res.status(404).json({ error: { message: "Portfolio Not Found" } });
      return;
    }
  } catch (err) {
    res.status(500).json({
      error: { message: "Something Went Wrong" },
    });
  }
};
