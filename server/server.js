const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/groups', require('./routes/groups'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/discussions', require('./routes/discussions'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/citations', require('./routes/citations'));

app.get('/', (req, res) => {
  res.json({ message: 'Research Hub API' });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
