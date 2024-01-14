import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    // creating a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "dd6344c5e8030e",
        pass: "72d1d6c294e5ff",
      },
    });

    const mailOptions = {
      from: "sarfarazahmed1012@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<h1>Reset Password</h1>
        <p>Click the link below to ${
          emailType === "VERIFY" ? "Verify your email" : "Reset your password"
        }</p>
        <a href="${process.env.domain}/${
        emailType === "VERIFY" ? "verifyEmail" : "forgetPassword"
      }?token=${hashedToken}">${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      }</a>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (e: any) {
    throw new Error(`Error sending`, e.message);
  }
};
