const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg', //update client to postgreSQL --> pg
  connection: {
    host : '127.0.0.1', //means local host (home)
    user : 'postgres',
    password : 'ojsem',
    database : 'smartbrain'
  }
});

// db.select('*').from('users').then(data => {
// 	console.log(data);
// })

//Runs Express
const app = express();
//Runs body-parser
app.use(express.json());
app.use(cors())

//Creating Basic Route that Everything is Working
app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req,res) => { signin.handleSignin(req, res, db, bcrypt) })

//Registering the User:
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) }) 

//user ID
app.get('/profile/:id', (req, res) =>  { profile.handleProfileGet(req, res, db) })

//Image
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

//Testing to see if Nodemon is running
app.listen(3000, () => {
	console.log('app is running on port 3000')
})