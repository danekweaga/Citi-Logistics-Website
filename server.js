require('dotenv').config();
const express = require('express');
const path = require('path');
const { query } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Contact form handler with SQL
app.post('/submit-contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.'
      });
    }

    // Execute SQL INSERT query
    const result = await query(
      `INSERT INTO contacts (name, email, phone, message) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, name, email, created_at`,
      [name.trim(), email.trim(), phone ? phone.trim() : null, message.trim()]
    );

    console.log('Contact form saved with SQL:', result.rows[0].id);
    
    res.json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('SQL Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save contact form. Please try again.'
    });
  }
});

// Booking form handler with SQL
app.post('/submit-booking', async (req, res) => {
  try {
    const { name, email, phone, move_date, move_type, details } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !move_date || !move_type || !details) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required for booking.'
      });
    }

    // Execute SQL INSERT query
    const result = await query(
      `INSERT INTO bookings (name, email, phone, move_date, move_type, details) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, name, email, move_date, created_at`,
      [name.trim(), email.trim(), phone.trim(), move_date, move_type, details.trim()]
    );

    console.log('Booking form saved with SQL:', result.rows[0].id);
    
    res.json({
      success: true,
      message: 'Booking submitted successfully! We will contact you soon.',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('SQL Booking form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save booking. Please try again.'
    });
  }
});

// API Routes for data management (useful for admin panel)
app.get('/api/contacts', async (req, res) => {
  try {
    const { rows } = await query(
      `SELECT id, name, email, phone, message, created_at 
       FROM contacts 
       ORDER BY created_at DESC 
       LIMIT 100`
    );
    
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('SQL SELECT error:', error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const { rows } = await query(
      `SELECT id, name, email, phone, move_date, move_type, created_at 
       FROM bookings 
       ORDER BY created_at DESC 
       LIMIT 100`
    );
    
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('SQL SELECT error:', error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// Serve your single-page app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Using PostgreSQL with raw SQL queries');
});