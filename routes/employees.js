import express from "express";
import { getEmployees, getEmployeeById } from "../controllers/employees.js";

const router = express.Router();

router.get("/", getEmployees);
router.get("/:employeeId", getEmployeeById);

export default router;
