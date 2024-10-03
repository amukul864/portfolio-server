import multer from "multer";
import path from "path";
import fs from "fs";
import ensureDirectoryExists from "./createDirectory";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
  filename: (req, file, cb) => {
    const type = req.body.typeWork;
    const label = req.body.labelWork;
    const filePath = `uploads/${type}/${label}/`;
    const fileName = `${file.originalname}`;
    ensureDirectoryExists(filePath);

    if (fs.existsSync(filePath + fileName)) {
      fs.unlinkSync(filePath + fileName);
    }

    cb(null, filePath + fileName);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const filetypes = /jpg|png|jpeg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
