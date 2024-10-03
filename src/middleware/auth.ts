import { Request, Response, NextFunction } from "express";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.query.token;

  if ((token as string) !== (process.env.PRIVATE_KEY as string) || !token) {
    return res.status(401).json({ error: { message: "Unauthorized" } });
  }

  next();
};

export default authMiddleware;
