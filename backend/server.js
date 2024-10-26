const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors'); 

const app = express();
app.use(cors()); 

app.use(express.json());
app.use('/tasks', taskRoutes); 
app.use('/auth', authRoutes); 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
