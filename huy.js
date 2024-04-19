// // Import necessary modules
// import express from 'express';
// import nodemailer from 'nodemailer'
// import mongoose from 'mongoose'

// // Initialize Express app
// const app = express();

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Define MongoDB schema
// const emailSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   }
// });

// const Email = mongoose.model('Email', emailSchema);

// // Set up nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-password'
//   }
// });

// // Express route to save email addresses
// app.post('/subscribe', async (req, res) => {
//   try {
//     const { email } = req.body;
//     // Check if the email already exists
//     const existingEmail = await Email.findOne({ email });
//     if (existingEmail) {
//       return res.status(400).send('Email already subscribed');
//     }
//     const newEmail = new Email({ email });
//     await newEmail.save();
//     res.status(201).send('Email subscribed successfully');
//   } catch (error) {
//     console.error('Error subscribing email:', error);
//     res.status(500).send('Internal server error');
//   }
// });

// // Express route to send emails
// app.post('/send-email', async (req, res) => {
//   try {
//     const { subject, text } = req.body;
//     // Retrieve all email addresses from MongoDB
//     const emails = await Email.find();
//     // Send email to each subscriber
//     emails.forEach(async (subscriber) => {
//       await transporter.sendMail({
//         from: 'your-email@gmail.com',
//         to: subscriber.email,
//         subject: subject,
//         text: text
//       });
//     });
//     res.status(200).send('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('Internal server error');
//   }
// });

// // Start the Express server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
