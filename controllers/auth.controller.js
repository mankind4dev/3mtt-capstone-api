import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const passHashed = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: passHashed });
  try {
    const userExist = await User.findOne({ $or: [{ username }, { email }] });

    if (userExist) {
      if (userExist.username === username) {
        return res.status(400).json({ error: "Username already exist" });
      }
      if (userExist.email === email) {
        return res.status(400).json({ error: "Email already exist" });
      }
    }

    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    res.send("Iterner server error");
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json( {message: "User not found"});
    } 

    const hashPassword = bcryptjs.compareSync(password, validUser.password);
    if (!hashPassword) {
      return res.status(401).json( {message: "Wrong credientials!"});
    } 

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    res.status(500).json({message:"Interner server error"});
  }
}; 