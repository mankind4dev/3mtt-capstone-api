import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avater: {
      type: String,
      default:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F9131%2F9131529.png&tbnid=xerVrcHRTNGcRM&vet=12ahUKEwj_r9qaneyDAxUSnCcCHRwqC1wQMygEegQIARB8..i&imgrefurl=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_9131529&docid=OG7nRYiTFgdAvM&w=512&h=512&q=user&ved=2ahUKEwj_r9qaneyDAxUSnCcCHRwqC1wQMygEegQIARB8",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
