import nodemailer from "nodemailer";
import { getMaxListeners } from "nodemailer/lib/xoauth2";

export const sendEmail = async (email, subject, text, html) => {
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "ghareeb874@gmail.com",
      pass: "dksr ynqa jrud vdoh",
    },
  });

  let info = await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
    html,
  });

  return info;
};
