import jwt from "jsonwebtoken";
import { userModel } from "./../../database/model/user.model.js";
import bcrypt, { hash } from "bcrypt";
import { sendEmail } from "../../common/email/sendEmail.js";


//vercel refresh
export const userRegister = async (req, res) => {
  let { name, email, password, userName, confrimPassword } = req.body;
  // console.log(req.body);
  let emailExist = await userModel.findOne({ email });
  if (emailExist)
    return res.status(409).json({ Message: "Email already exist" });
  let userNameExist = await userModel.findOne({ userName });
  if (userNameExist)
    return res.status(409).json({ Message: "userName already exist" });
  if (password != confrimPassword)
    return res.status(400).json({ Message: "password doesnt match" });

  // let image;
  // if (req.file) {
  //   image = `http://localhost:8000/uploads/${req.file.originalname}`;
  // }

  let hashed = await bcrypt.hash(password, 10);

  let addedUser = await userModel.create({
    name,
    email,
    userName,

    password: hashed,
    // image,
  });
  let token = jwt.sign({ id: addedUser._id }, "verify");

  // let verifyLink = `<button> <a href = "http://localhost:3000/authentication/verify?token=${token}">verify account </a>
  // </button>`;
  let verifyLink = `<button>
  <a href="https://alighareeb-saraha-clone.vercel.app/authentication/verify?token=${token}">
    verify account
  </a>
</button>`;

  await sendEmail(email, "verify your account", null, verifyLink);

  if (!addedUser)
    return res.status(500).json({ Message: "something went wrong" });
  res.json({ Message: "user added successfully", addedUser });
};;

export const userLogin = async (req, res) => {
  let { email, password } = req.body;

  let userExist = await userModel.findOne({ email });

  if (!userExist) return res.json({ Message: "user not found" });

  if (!userExist.isVerified) return res.json({ msg: "user not verified" });

  let matchedPassword = await bcrypt.compare(password, userExist.password);
  if (!matchedPassword) return res.json({ message: "incoorect password" });

  let signature = "";
  switch (userExist.role) {
    case "admin":
      signature = "admin";
      break;
    case "user":
      signature = "user";
      break;
    default:
      break;
  }

  let accessToken = jwt.sign({ _id: userExist._id }, signature, {
    expiresIn: "30m",
  });
  let refreshToken = jwt.sign({ _id: userExist._id }, signature, {
    expiresIn: "1y",
  });

  res.json({
    Message: "user info",
    user: userExist,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};

export const generateAccessToken = async (req, res) => {
  //   console.log(req.user);
  let id = req.user;
  console.log(id);
  let user = await userModel.findById(id);
  let signature = "";
  switch (user.role) {
    case "admin":
      signature = "admin";
      break;
    case "user":
      signature = "user";
      break;
    default:
      break;
  }

  let accessToken = jwt.sign({ _id: user._id }, signature, {
    expiresIn: "7d",
  });
  res.json({ accessToken: accessToken });
};

export const forgetPassword = async (req, res) => {
  let { email } = req.body;
  let exist = await userModel.findOne({ email });

  if (!exist) return res.json({ message: "email not found" });
  // console.log(exist);

  let otp = String(Math.floor(100000 + Math.random() * 900000));

  await sendEmail(
    email,
    "forget password : otp ",
    `yout otp for resetting yout password is ${otp}`,
  );

  exist.otp = otp;
  await exist.save();

  res.json({ mmessage: "otp sent successuflly" });
};

export const resetPassword = async (req, res) => {
  let { email, otp, password, confrimPassword } = req.body;

  let exist = await userModel.findOne({ email });

  if (!exist) return res.json({ msg: "user not found" });

  if (exist.otp == otp) {
    if (password !== confrimPassword) {
      return res.json({ msg: "passwords are not matched" });
    }
    let hash = await bcrypt.hash(password, 10);
    exist.password = password;
    exist.otp = null;
    await exist.save();
    res.json({ msg: "password updated successfully" });
  } else {
    res.json({ msg: "otp is wrong" });
  }
};

export const resendOTP = async (req, res) => {
  let { email } = req.body;
  let exist = await userModel.findOne({ email });
  console.log(exist);

  if (!exist) {
    return res.json("not found");
  }

   let otp = String(Math.floor(100000 + Math.random() * 900000));

   exist.otp = otp;
   await exist.save();

   await sendEmail(email, "resent otp", `otp is ${otp}`);

  res.json({ msg: "otp resent", otp });
};

export const verifyAccount = async (req, res) => {
  let { token } = req.query;

  let decode = jwt.verify(token, "verify");

  let exist = await userModel.findById(decode.id);

  if (!exist) {
    return res.json({ msg: "not found" });
  }
  if (exist.isVerified) return res.json({ msg: "already verified" });

  exist.isVerified = true;

  await exist.save();

  return res.json({ msg: "verified successfully" });
};