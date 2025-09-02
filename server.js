const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit-booking', upload.array('files'), async (req, res) => {
  const { name, email, phone, details } = req.body;
  const files = req.files;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'YOUR_EMAIL@gmail.com',
      pass: 'YOUR_APP_PASSWORD'
    }
  });

  const attachments = files.map(file => ({
    filename: file.originalname,
    path: file.path
  }));

  const mailOptions = {
    from: email,
    to: 'YOUR_DAD_EMAIL@gmail.com',
    subject: `New Booking from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDetails: ${details}`,
    attachments
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('<h2>Booking submitted successfully! We will contact you soon.</h2>');
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Failed to send booking. Please try again.</h2>');
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
