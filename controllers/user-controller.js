const User = require("../models/userModel"); // Import the User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser)
      return res
        .status(500)
        .json({ error: "Email Address already exists, Try logging in" });
    let encryptedPassword;
    await bcrypt.hash(password, 10, async (err, hash) => {
      if (hash) {
        encryptedPassword = hash;
        const sha256Hash = crypto
          .createHash("sha256")
          .update(email, process.env.SHA_256_SECRET)
          .digest("hex");
        const newUser = new User({
          email,
          lastName,
          firstName,
          password: hash,
          appUserId: sha256Hash, // Store the hashed password in the database
        });

        // Save the user to the database
        try {
          const savedUser = await newUser.save();
          res.status(200).json(savedUser);
        } catch (err) {
          console.error(err);
          res
            .status(500)
            .json({ error: "Could not save the user to the database" });
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const finduser = await User.findOne({ email: email });

    if (!finduser) res.status(404).json({ error: "Inavlid User Name" });

    await bcrypt.compare(password, finduser.password, async (err, result) => {
      if (err) {
        console.error(err);
      } else if (result) {
        const token = await jwt.sign(
          {
            email: finduser.email,
            appUserId: finduser.appUserId,
            fullName: finduser.firstName + finduser.lastName,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h", // Token expiration time
          },
        );
        res.status(201).json({ token });
      } else {
        console.log("Password is incorrect");
        // Deny access
        res.status(500).json({ error: "Invalid password" });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

const getUsers = async (req, res) => {
  try {
    const appUserId = req.params.id;
    const findusers = await User.findOne(appUserId);
    if (findusers) {
      res.status(200).json({ data: findusers });
    } else res.status(500);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
module.exports = { createUser, login, getUsers };
