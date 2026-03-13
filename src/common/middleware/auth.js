import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  let { authentication } = req.headers;
  let [bearer, token] = authentication.split(" ");

  let signature = "";
  switch (bearer) {
    case "admin":
      signature = "admin";
      break;
    case "user":
      signature = "user";
      break;
    default:
      break;
  }
  let decode = jwt.verify(token, signature);

  req.user = decode._id;
  next();
};
