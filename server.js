const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signIn = require('./controllers/signIn.js');
const image = require('./controllers/image.js');
const PORT = process.env.PORT;


const db = knex({
    client: 'pg',
    connection: {
    host : process.env.DATABASE_URL,
    ssl: true
    }
  });

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.json('root')})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.post('/signIn', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)})

app.post('/clarifaiApi', (req, res) => {image.handleApiCall(req, res)})

app.register

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})