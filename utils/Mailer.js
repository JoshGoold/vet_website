
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USERNAME, // ✅ Use proper env names
    pass: process.env.PASSWORD,
  },
});



export async function sendTwoFactorAuth(userEmail, code, subject, text) {
    try {
      const info = await transporter.sendMail({
        from: `"WWII Research Guide" <${process.env.USERNAME}>`,
        to: userEmail,
        subject,
        text,
        html: `
          <div>
            <h1>Your Two Factor Auth Code</h1>
            <ul>
              <li><h2>${code}</h2></li>
            </ul>
          </div>
        `,
      });
      console.log("Email sent:", info.messageId);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }