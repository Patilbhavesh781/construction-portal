import mailTransporter from "../config/mail.js";
import ApiError from "../utils/ApiError.js";

/**
 * Send an email
 */
export const sendMail = async ({ to, subject, html, text }) => {
  try {
    const fromEmail = process.env.MAIL_FROM_EMAIL || process.env.MAIL_USER;
    const fromName = process.env.MAIL_FROM_NAME || "BuildPro Support";
    const mailOptions = {
      from: fromEmail ? `${fromName} <${fromEmail}>` : fromName,
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

/**
 * Send email verification
 */
export const sendEmailVerificationEmail = async (user, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?email=${encodeURIComponent(
    user.email
  )}`;
  const subject = "Verify Your Email";
  const html = `
    <p>Hi ${user.name},</p>
    <p>Your verification code:</p>
    <h2>${token}</h2>
    <p>Or click the link below to verify:</p>
    <a href="${verifyUrl}">${verifyUrl}</a>
    <p>This code expires in 24 hours.</p>
  `;
  return sendMail({ to: user.email, subject, html });
};
