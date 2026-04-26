"use server";

import nodemailer from "nodemailer";

export async function sendDirectEmail({ name, email, message }) {

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Revodials" <${process.env.EMAIL_USER}>`, // ✅ Use your own Gmail here
      to: email,
      replyTo: email, // ✅ Allows replies to user
      subject: `message from Revodials`,
      html: `
     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
    <h2 style="color: #0052cc;">Dear ${name || "Customer"},</h2>    
    <div style="margin-left: 20px; padding: 10px; background-color: #f9f9f9; border-left: 4px solid #0052cc;">
      ${message.replace(/\n/g, "<br>")}
    </div>

    <p>If you have any further questions, feel free to reply to this email.</p>

    <p>Best regards,<br>
    <strong>Revodials Support Team</strong><br>
    Revodials</p>
  </div>
  `,
    });

    return { success: true, message: "Email sent successfully!" };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, message: "Failed to send email." };
  }
}
