// import express from "express";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();

// router.post("/send", async (req, res) => {
//   const { name, email, phone, message } = req.body;

//   if (!name || !email || !phone || !message) {
//     return res
//       .status(400)
//       .json({ success: false, message: "All fields are required" });
//   }

//   // Nodemailer Transporter
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL, // Your email
//       pass: process.env.EMAIL_PASSWORD, // App Password (Generated from Google)
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: "mukhtarkabirmuhammad32@gmail.com", // Your email
//     subject: "New Inquiry from Your Website",
//     text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res
//       .status(200)
//       .json({ success: true, message: "Inquiry sent successfully!" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to send inquiry" });
//   }
// });

// export default router;
