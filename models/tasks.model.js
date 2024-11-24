import mongoose from "mongoose";

const tasksChema = new mongoose.Schema(
   {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadLine: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
    },
  },
  { timestamps: true }
);

export const Tasks = mongoose.model("Task", tasksChema);

export default Tasks;
