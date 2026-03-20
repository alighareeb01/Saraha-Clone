import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text, html) => {
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "ghareeb874@gmail.com",
      pass: "cjvr hgqd vnxg fhgo",
    },
  });

  let info = await transport.sendMail({
    from: `"Mahmoud" <ghareeb874@gmail.com>`,
    to: email,
    subject: subject,
    text: text,
    html,
  });

  return info; // ✅ important
};
