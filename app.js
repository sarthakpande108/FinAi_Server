const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const assetRoutes = require('./routes/assetRoutes');
const financialGoalRoutes = require('./routes/financialGoalRoutes');
require('dotenv').config();
require('./config/passport');

const app = express();
const corsOptions = {
  origin: '*', // Default to '*' for local testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/financialgoals', financialGoalRoutes);



const sequelize = require('./config/database');
const User = require('./models/User');
const Profile = require('./models/Profile');
const FinancialGoal = require('./models/FinancialGoal');
const Asset = require('./models/Asset');


app.get('/hello',(req,res)=>{
  res.send('hello its finai server')
})

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Update this URL with your ngrok public URL
    const response = await axios.post('https://35fb-35-240-164-212.ngrok-free.app/generate', { prompt });

    res.json({ generatedText: response.data.generated_text });
  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).send('Error generating text');
  }
});


sequelize.sync({ force: process.env.NODE_ENV === 'development' }) // Use { force: true } for development to drop tables if they exist
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });


app.listen(process.env.PORT || 3002, () => {
  console.log(`Server is running on port ${process.env.PORT || 3002}`);
});
