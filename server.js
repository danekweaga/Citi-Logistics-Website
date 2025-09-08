require('dotenv').config();

const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Booking form handler - UPDATED FOR JSON RESPONSE
app.post('/submit-booking', upload.array('files'), async (req, res) => {
  const { name, email, phone, details } = req.body;
  const files = req.files;

  const attachments = files.map(file => ({
    filename: file.originalname,
    path: file.path
  }));

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Send to yourself
    subject: `New Booking from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDetails: ${details}`,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Details:</strong></p>
      <p>${details.replace(/\n/g, '<br>')}</p>
      <p><strong>Number of files attached:</strong> ${files.length}</p>
    `,
    attachments
  };

  try {
    await transporter.sendMail(mailOptions);
    // JSON response for single-page app
    res.json({ 
      success: true, 
      message: 'Booking submitted successfully! We will contact you soon.' 
    });
  } catch (error) {
    console.error('Booking error:', error);
    // JSON error response
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send booking. Please try again.' 
    });
  }
});

// Contact form handler - UPDATED WITH PHONE FIELD
app.post('/submit-contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
    html: `
      <h3>New Contact Form Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ 
      success: true, 
      message: 'Message sent successfully! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again.' 
    });
  }
});

// Booking form handler - NO CHANGES NEEDED (already handles the fields)

// Serve your single-page app for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});