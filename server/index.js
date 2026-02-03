const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Database Connection
const connectDB = async () => {
    try {
        const connStr = process.env.MONGO_URI;
        console.log(`Connecting to MongoDB at: ${connStr.startsWith('mongodb+srv') ? 'Atlas Cluster' : 'Localhost'}`);

        await mongoose.connect(connStr, {
            // Options
        });
        console.log('MongoDB Connected Successfully');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

connectDB();

// Routes (Placeholder)
app.get('/', (req, res) => {
    res.send('Mini Social App API requires /api/...');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
