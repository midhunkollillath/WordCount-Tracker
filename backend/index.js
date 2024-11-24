const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/dbConnection');
const insightRoutes = require('./route/insightRoute');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], 
  credentials: true, 
}));

app.use(bodyParser.json());

// Use the insight routes
app.use('/api', insightRoutes);

sequelize.sync().then(() => {
  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
  });
});
