const express = require('express');
require('./db/connection')
const app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
const user = require('./models/User');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');	

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('landing');
})


app.get('/signup', (req, res) => {
    res.render('signup')
   // user_id, email, username, password, passwordConf = req.body;
})
app.post('/register', async (req, res) => {
    try {
        let username1;
        const { user_id, email, username, password, passwordConf } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        if (password === passwordConf) {
            const newUser=new user({
                user_id: user_id,
                email:email,
                username: username,
                password: hashedPassword,
                passwordConf:hashedPassword
            })

          // Assign the username from the request to the variable
          username1 = req.body.username;
    
            console.log(username1);
           
          await newUser.save();
          res.send(`Data saved successfully.${username1}`);
        }
      
    }
    catch(error){
        console.error("Error saving data:", error);
        res.status(500).send("Internal Server Error");
   }
 })


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await user.findOne({ email: email });

        if (result) {
            const isPasswordValid = await bcrypt.compare(password, result.password);
   
            if (isPasswordValid) {
              // Set a cookie to represent the user's session
      
           res.send(`Welcome, ${result.username}!`);
         } else {
           res.status(401).send('Invalid password');
        }
        }
        else {
            res.status(401).send('User not found');
          }
       
        
        
    }catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }

   
   
   
})
app.get('/hello', (req, res) => {
    res.cookie('username', 'john_doe', { maxAge: 900000, httpOnly: true });

    // Read cookies
    console.log(req.cookies);
  
    res.send('Hello World!');
})
app.listen(8000, 'localhost', () => {
    

    console.log("server is listening.........")
})