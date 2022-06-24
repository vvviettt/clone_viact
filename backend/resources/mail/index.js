import nodemailer from "nodemailer";
import "dotenv/config";

const mailer = {
  send: async (subject, message, to) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    });

    let info = await transporter.sendMail(
      {
        from: `${process.env.MAIL_FROM}`,
        to: `${to}`,
        subject: `${subject}`, // Subject line
        text: `${message}`, // Messageplain text body
      },
      (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(res);
      }
    );
  },
};

export default mailer;
