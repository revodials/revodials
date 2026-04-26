"use server";

import nodemailer from "nodemailer";

export async function sendEmail({ email, orderId, customerEmail = false, OrderData }) {
  if (!email) {
    return { success: false, message: "Email address is required." };
  }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlTemplate = customerEmail
      ? getCustomerTemplate(orderId)
      : getVendorTemplate(orderId, OrderData);

    const subject = customerEmail
      ? "Order Confirmation - Revodials"
      : "New Order Received - Revodials";

    const mailOptions = {
      from: `"Revodials" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: email,
      subject,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: "Email sent successfully!" };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, message: "Failed to send email." };
  }
}


// ✅ Customer HTML Template
function getCustomerTemplate(orderId) {
  return `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #333;">Thank you for your order!</h2>
      <p style="font-size: 16px; color: #555;">We’ve received your order and are getting it ready. Here are the details:</p>
      <p style="font-size: 18px;"><strong>Order tracking ID:</strong> <span style="color: #007BFF;">${orderId}</span></p>
      <p style="font-size: 16px;">Your order will be shipped within <strong>2 to 3 working days</strong>.</p>
      <p style="margin-top: 30px; font-size: 14px; color: #888;">If you have any questions, feel free to reply to this email.</p>
      <p style="font-size: 14px; color: #888;">– The Revodials Team</p>
    </div>
  </div>
  `;
}

// ✅ Vendor HTML Template
function getVendorTemplate(orderId, OrderData) {
  const { user, items, totalAmount, createdAt } = OrderData;

  const productList = items.map((item, index) => `
    <tr>
      <td style="padding:10px;border-bottom:1px solid #eee;">${index + 1}</td>
      <td style="padding:10px;border-bottom:1px solid #eee;">
        <strong>${item.productId?.name || 'Product Name'}</strong>
      </td>
      <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">
        ${item.quantity}
      </td>
      <td style="padding:10px;border-bottom:1px solid #eee;">
        ${item.selectedVariant || 'Default'}
      </td>
    </tr>
  `).join('');

  return `
  <div style="font-family:Segoe UI,Arial,sans-serif;background:#f6f7fb;padding:10px;">
    <div style="max-width:720px;width:100%;margin:auto;background:#ffffff;border-radius:14px;box-shadow:0 15px 40px rgba(0,0,0,0.08);overflow:hidden;">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#ff9800,#ff5722);padding:20px;color:white;">
        <h1 style="margin:0;font-size:22px;line-height:1.3;">🎉 New Order Received</h1>
        <p style="margin:6px 0 0;opacity:0.9;">Revodials Web Store</p>
      </div>

      <!-- Body -->
      <div style="padding:20px;color:#333;">

        <!-- Order Info -->
        <div style="background:#fff3e0;padding:14px;border-radius:10px;margin-bottom:20px;">
          <p style="margin:0;font-size:15px;">
            <strong>Order ID:</strong>
            <span style="color:#ff5722;font-weight:600;">${orderId}</span>
          </p>
          <p style="margin:6px 0 0;font-size:13px;color:#666;">
            📅 ${new Date(createdAt).toLocaleString()}
          </p>
        </div>

        <!-- Customer -->
        <h3 style="margin-bottom:8px;">👤 Customer Information</h3>
        <div style="background:#fafafa;padding:14px;border-radius:10px;font-size:14px;">
          <p><strong>Name:</strong> ${user.Name}</p>
          <p><strong>Phone:</strong> ${user.contact}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address}, ${user.city}</p>
        </div>

        <!-- Products -->
        <h3 style="margin:22px 0 8px;">🛍 Ordered Products</h3>
        <div style="border:1px solid #eee;border-radius:10px;overflow-x:auto;">
          <table style="width:100%;min-width:600px;border-collapse:collapse;font-size:14px;">
            <thead style="background:#f9fafb;">
              <tr>
                <th style="padding:10px;text-align:left;">#</th>
                <th style="padding:10px;text-align:left;">Product</th>
                <th style="padding:10px;text-align:center;">Qty</th>
                <th style="padding:10px;text-align:left;">Variant</th>
              </tr>
            </thead>
            <tbody>
              ${productList}
            </tbody>
          </table>
        </div>

        <!-- Total -->
        <div style="margin-top:20px;padding:14px;background:#e8f5e9;border-radius:10px;font-size:15px;">
          <strong>💰 Total Amount:</strong><br/>
          <span style="color:#2e7d32;font-weight:700;">
            Rs ${totalAmount}
          </span>
        </div>

        <!-- Footer -->
        <p style="margin-top:30px;font-size:12px;color:#999;text-align:center;">
          Please process this order as soon as possible.<br/>
          — <strong>Revodials Order System</strong>
        </p>

      </div>
    </div>
  </div>
  `;
}




export async function contactUsEmailSender(email, name, message) {
  if (!email) {
    return { success: false, message: "Email address is required." };
  }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Revodials" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "Contact page query",
      html: `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fffbe6;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-left: 5px solid #ffa500;">
            <h4 style="color: #444;">Name : ${name}</h4>
            <h4 style="color: #444;">Email : ${email}</h4>
            <p style="font-size: 16px;">
            ${message}
            </p>
            <p style="margin-top: 30px; font-size: 14px; color: #888;">
              – Revodials Order System
            </p>
          </div>
        </div>`,
    });

    return { success: true, message: "Email sent successfully!" };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, message: "Failed to send email." };
  }
}

export async function statusEmail(data) {
  try {
    console.log("TCL: statusEmail -> data", data)
    const { email, orderId, status } = data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlTemplate = getStatusTemplate({ status, orderId });

    const subjectMap = {
      processing: "Order Processing - Revodials",
      shipped: "Your Order Has Been Shipped - Revodials",
      cancelled: "Order Cancelled - Revodials",
    };

    const subject = subjectMap[status] || "Order Update - Revodials";

    await transporter.sendMail({
      from: `"Revodials" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_USER,
      subject,
      html: htmlTemplate,
    });

    return { success: true, message: "Email sent successfully!" };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, message: "Failed to send email." };
  }
}

function getStatusTemplate({ status, orderId }) {
  let statusMessage = "";
  let highlightColor = "#007BFF";

  if (status === "processing") {
    statusMessage = "We’ve received your order and are getting it ready.";
  } else if (status === "shipped") {
    statusMessage = "Your order has been shipped and is on its way!";
    highlightColor = "#28a745";
  } else if (status === "cancelled") {
    statusMessage = "We're sorry to inform you that your order has been cancelled.";
    highlightColor = "#dc3545";
  } else {
    statusMessage = "Here is an update regarding your order.";
  }

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <p style="font-size: 16px; color: #555;">${statusMessage}</p>
        <p style="font-size: 18px;"><strong>Order Tracking ID:</strong> <span style="color: ${highlightColor};">${orderId}</span></p>
        ${status === "processing"
      ? `<p style="font-size: 16px;">Your order will be shipped within <strong>2 to 3 working days</strong>.</p>`
      : ""
    }
        <p style="margin-top: 30px; font-size: 14px; color: #888;">If you have any questions, feel free to reply to this email.</p>
        <p style="font-size: 14px; color: #888;">– The Revodials Team</p>
      </div>
    </div>
  `;
}
