

require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

require("./src/db/conn");
const Register = require("./src/models/register");
const UserProfile = require("./src/models/userinfo");
const { json } = require("express");
const { log } = require("console");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const auth = require("./src/middleware/auth");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "./public");
const template_path = path.join(__dirname, "./templates/views"); // we are changing the actual view path so tell this to express
const partial_path = path.join(__dirname, "./templates/partials"); // locate the location of partials files

//Middleware
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", template_path); // tell express views path is replaced by template_path
hbs.registerPartials(partial_path); // tell the location of partials files



// Define a Handlebars helper to check for active links
hbs.registerHelper("isActive", (currentPath, linkPath) => {
  return currentPath === linkPath ? "active" : "";
});


app.get("/", (req, res) => {
  res.render("index",{ request: req });
});

// secret page which can only be access if login is there becoz we use auth
app.get("/secret", auth, (req, res) => {

  try {
    // Here, you can fetch user data from your database
    const userData1= {
      Username: req.user.Username,
      Email: req.user.Email
      
    };
  

    res.render("secret", { userData1 , request: req});
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
 
});

//logout work
app.get("/logout", auth, async (req, res) => {
  try {
    // console.log(req.user); // give all data of that user

// for single logout
// this is used to remove token from database also
// this delete token of current device login only and if some other device also login then for that i does not do logout
// basically it logout only current device not all which are login to this site

    // req.user.tokens = req.user.tokens.filter((currElement) => {
    //     return currElement.token !== req.token;
    // })

//for logout from all devices

    req.user.tokens =[]  // empty array

// this is used to delete cookie from browser it does not delete token from database
    res.clearCookie("jwt"); // delete generated cookie

    console.log("logout successfully");
    await req.user.save();
    res.render("login" , {request: req}); //after logout go to login page
  } catch (error) {
    res.status(500).send("Please login First, then logout works..!!!");
  }
});

app.get("/register", (req, res) => {
  res.render("register",{ request: req });
});

app.get("/login", (req, res) => {
  res.render("login",{ request: req });
});

//create new user in our database

// Assuming you have an Express route to handle the form submission
app.post('/update-profile', async (req, res) => {
  try {
    const { username, age, phone, address } = req.body;

    // Check if the user already exists
    const user = await Register.findOne({ Username: username });

    if (!user) {
      return res.status(404).send("User not found. Enter correct Username");
    }

    // Check if the user already has a profile
    const existingProfile = await UserProfile.findOne({ username: username });

    if (existingProfile) {
      // Update the existing profile
      existingProfile.age = age;
      existingProfile.phone = phone;
      existingProfile.address = address;
      await existingProfile.save();
    } else {
      // Create a new user profile document
      const userProfile = new UserProfile({
        username: username,
        age,
        phone,
        address,
      });

      // Save the user profile to the database
      if(user){
      await userProfile.save();
      }
    }

    // Respond with success
    // return res.status(200).json({ success: true, message: 'Profile updated successfully' });
    const userData1= {
      Username: user.Username,
      Email: user.Email,
    }
    res.render("secret", { userData1 })
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



app.post("/register", async (req, res) => {
  try {
    const password = req.body.Password;
    const cpassword = req.body.Confirmpassword;

    if (password === cpassword) {
      const registration = new Register({
        Username: req.body.Username,
        Email: req.body.Email,
        Password: req.body.Password,
        Confirmpassword: req.body.Confirmpassword,
      });

      // Save the user registration data to the database
      const registered = await registration.save();

      // Generate a token for the user
      const token = await registration.generateAuthToken();

      // Set the JWT token as a cookie
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      });

      // Render the "index" view after successful registration
      // res.status(201).render("index");
      
      res.status(201).render("index", {request: req});
    } else {
      res.send("Password does not match");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});


//login check

app.post("/login", async (req, res) => {
  try {
    const username = req.body.Username;
    const password = req.body.Password;

    const user = await Register.findOne({ Username: username }); //lastone upone username
    //    res.send(user);
    //    console.log(user );

    // check at time login the user enter password is equal to database password (hashed one)
    const isMatch = await bcrypt.compare(password, user.Password); //(usereneterd password, password in database)

    const token = await user.generateAuthToken(); // func write in register.js mai
    console.log(`the token part ${token}`);

    //cookies
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 600000),
      httpOnly: true,
      //secure:true
    });

    // get cookies
    // console.log(`THis is cookie  ${ req.cookies.jwt}`)  // this part is under .get secret

    // check at time login the user enter password is equal to database password

    // if(user.Password === password){
    //     res.status(201).render("index"); // on correct password to next page
    // }
    // else{
    //     res.status(404).send("invalid Login details");
    // }
    if (isMatch) {
    const userData1= {
      Username: user.Username,
      Email: user.Email,
    }
    
     // res.status(201).render("index"); // on correct password to next page
     res.status(201).render("secret", { userData1 , request: req});
    } else {
      res.status(404).send("invalid  details");
    }
  } catch (error) {
    res.status(400).send("invalid Login details");
  }
});



app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
