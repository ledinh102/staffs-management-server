import express from "express";
import { getSalary, getTopSalary } from "../controllers/salary.js";

const router = express.Router();

router.get("/", getSalary);
router.get("/top/:limit", getTopSalary);

export default router;
