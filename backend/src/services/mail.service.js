import mailTransporter from "../config/mail.js";
import ApiError from "../utils/ApiError.js";

/**
 * Send an email
 */
export const sendMail = async ({ to, subject, html, text }) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_FROM_EMAIL,
      to,
      subject,
      text,
      html,
    };

    const info = await mailTransporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Mail error:", error);
    throw new ApiError(500, "Failed to send email");
  }
};

/**
 * Send welcome email
 */
export const sendWelcomeEmail = async (user) => {
  const subject = "Welcome to Our Platform!";
  const html = `
    <h1>Welcome, ${user.name}!</h1>
    <p>Thank you for registering with us. We're excited to have you on board.</p>
  `;
  return sendMail({ to: user.email, subject, html });
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  const subject = "Password Reset Request";
  const html = `
    <p>You requested a password reset.</p>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>If you did not request this, please ignore this email.</p>
  `;
  return sendMail({ to: user.email, subject, html });
};
