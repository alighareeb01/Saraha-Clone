import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text, html) => {
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "ghareeb874@gmail.com",
      pass: "inza herf borm mhwn",
    },
  });

  let info = await transport.sendMail({
    from: `"Aly" <ghareeb874@gmail.com>`,
    to: email,
    subject: subject,
    text: text,
    html,
  });

  return info;
};
