import multer from "multer";

export const upload = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads"); // folder inside project
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const uploader = multer({ storage });

  return uploader;
};
