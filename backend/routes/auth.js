const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const { TOKEN_SECRET } = require("../config/config");

//REGISTER USER
router.post("/register", async (req, res) => {
  //VALIDATE data before creating user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user already exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN USER
router.post("/login", async (req, res) => {
  //VALIDATE data before creating user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user already exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email dosent exists");

  //Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  //Create jwt token
  const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);
  res.header("authorization", token);

  return res.send(token); //.send("Success");
});

module.exports = router;
