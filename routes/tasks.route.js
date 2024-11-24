import express from "express"
import { createTasks, getUserTasks } from "../controllers/tasks.controller.js"
import { authenticateToken } from "../utilities/veryfy.js"


const router = express.Router()

router.post("/create", authenticateToken, createTasks)
router.get("/get/:id", authenticateToken, getUserTasks)

export default router