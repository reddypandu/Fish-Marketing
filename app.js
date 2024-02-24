const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://laddu:laddu630@cluster0.iq5opdo.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/log-in.html');
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.send('Signup successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error signing up');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.redirect('/home.html');
    } else {
      res.send('Invalid email or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
