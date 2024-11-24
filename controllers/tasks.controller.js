import Tasks from "../models/tasks.model.js";

export const createTasks = async (req, res) => {
  const { title, description, deadLine, priority } = req.body;
  try {
    const tasks = new Tasks({
      userId: req.user.id,
      title,
      description,
      deadLine: new Date(deadLine),
      priority,
    });

    const saveTasks = await tasks.save();
    return res.status(201).json(saveTasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findById(req.params.id);
    if (!tasks) {
      return res.status(404).json({ message: "Tasks Not Found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status().json();
  }
};

export const deleteTask = async (req, res) => {
  const task = await Tasks.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Tasks Not Found" });
  }

  if (req.user.id !== task.userRef) {
    return res
      .status(401)
      .json({ message: "You can only delete your own account" });
  }

  try {
    await Tasks.findByIdAndDelete(req.params.id);
    res.status(200).json("Task has been deleted!");
  } catch (error) {
    res.status().json();
  }
};

export const updateTask = async (req, res, next) => {
  const task = await Tasks.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Tasks Not Found" });
  }

  if (req.user.id !== task.userRef) {
    return res
      .status(401)
      .json({ message: "You can only delete your own account" });
  }

  try {
    const updateTasks = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateTasks);
  } catch (error) {
    res.status().json();
  }
};
