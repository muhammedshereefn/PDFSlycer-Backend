const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dbConfig = require('./config/db'); 
const pdfRoutes = require('./routes/pdfRoutes');
const userRoutes = require('./routes/userRoutes')
const errorhandler = require('./middlewares/errorHandler')
const notFount = require('./middlewares/notFound') 

const app = express();


require('dotenv').config()

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Serve static files from the 'uploads' folder
app.use('/files', express.static('files'));

// MongoDB connection
dbConfig();

// Routes
app.use('/api/pdf', pdfRoutes);
app.use('/api/user', userRoutes)

//Not Found (404)
app.use(notFount);

//Global Error Handler
app.use(errorhandler)

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});