const express = require('express'); // Import For Express
const dotenv = require('dotenv'); // Import dotenv
const cors = require('cors');
const connectDB = require('./app/config/db.js'); // Connect Database

dotenv.config(); // .env with config
const app = express();
connectDB()

app.use(express.json()); // use Express
app.use(cors()); // Use cors

// Todo API (Mother Routing) 
const TodoRouter = require('./app/router/TodoRouter.js');
app.use('/api', TodoRouter);

// Auth API router
const AuthRouter = require('./app/router/AuthRouter');
app.use('/auth', AuthRouter);

const port = 3004
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});