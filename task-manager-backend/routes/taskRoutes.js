const express = require("express");
const { check } = require("express-validator");
const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(authMiddleware); // Protect all routes

router.get("/", getTasks);

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("dueDate", "Due date is required and must be a valid date")
      .isDate()
      .custom((value) => {
        if (new Date(value) < new Date())
          throw new Error("Due date cannot be in the past");
        return true;
      }),
    check("status", "Status is required").not().isEmpty(),
  ],
  createTask
);

router.get("/:id", getTaskById);

router.put(
  "/:id",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("dueDate")
      .optional()
      .isDate()
      .custom((value) => {
        if (new Date(value) < new Date())
          throw new Error("Due date cannot be in the past");
        return true;
      }),
    check("status", "Status is required").not().isEmpty(),
  ],
  updateTask
);

router.delete("/:id", deleteTask);

module.exports = router;
