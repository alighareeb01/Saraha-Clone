import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text, html) => {
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // user: process.env.EMAIL_USER,
      // pass: process.env.EMAIL_PASS,
      user: "gharoob874@gmail.com",
      pass: "gsxs vjff reoj oefo",
    },
  });

  let info = await transport.sendMail({
    from: "gharoob874@gmail.com",
    to: email,
    subject: subject,
    text: text,
    html,
  });

  return info;
};
