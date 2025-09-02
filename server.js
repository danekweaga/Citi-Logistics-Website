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
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'citilogisticforms@gmail.com',
    pass: 'citilogistics12345!@#$%Q'
  }
});

// Booking form handler (existing)
app.post('/submit-booking', upload.array('files'), async (req, res) => {
  const { name, email, phone, details } = req.body;
  const files = req.files;

  const attachments = files.map(file => ({
    filename: file.originalname,
    path: file.path
  }));

  const mailOptions = {
    from: email,
    to: 'citilogisticforms@gmail.com',
    subject: `New Booking from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDetails: ${details}`,
    attachments
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('<h2>Booking submitted successfully! We will contact you soon.</h2><a href="/">Go back to homepage</a>');
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Failed to send booking. Please try again.</h2><a href="/booking.html">Go back</a>');
  }
});

// Contact form handler (new)
app.post('/submit-contact', async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'YOUR_DAD_EMAIL@gmail.com',
    subject: `Contact Form Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <h3>New Contact Form Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send(`
      <h2>Message sent successfully! We will get back to you soon.</h2>
      <a href="/contact-us.html">Send another message</a> | 
      <a href="/">Go to homepage</a>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send(`
      <h2>Failed to send message. Please try again.</h2>
      <a href="/contact-us.html">Go back</a>
    `);
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});