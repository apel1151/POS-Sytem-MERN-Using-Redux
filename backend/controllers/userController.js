const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

//jwt token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// signup controller
const registerController = async (req, res) => {
  const {name, email, password } = req.body;
  console.log('Request body:', req.body);
  //validation email and password
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please give all the information" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid." });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password is not strong enough" });
  }

  try {
    // Wait for the promise to resolve
    const exists = await User.findOne({ email });

    if (!exists) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // Wait for the user creation to complete
      const user = await User.create({name, email, password: hash });
      // create a token
      const token = createToken(user._id);
      res.status(200).json({ email, token });
    } else {
     return res.status(400).json({ error: "Email already in use. Please Login" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login controller
const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide both email and password" });
  }

  try {
    const user = await User.findOne({ email });
    //create token
    const token = createToken(user._id)
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Password doesn't match" });
    } else {
      return res.status(200).json({email, token});
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { loginController, registerController };
