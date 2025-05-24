const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// serve static files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// routes
app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
