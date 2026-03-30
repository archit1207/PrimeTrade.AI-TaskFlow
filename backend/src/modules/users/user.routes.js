import express from "express";
import { getAllUsers, getUserById } from "./user.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.use(protect, authorizeRoles("admin"));

router.get("/", getAllUsers);
router.get("/:id", getUserById);

export default router;