import express from "express";
import { getPersonals, getPersonalById } from "../controllers/personals.js";

const router = express.Router();

router.get("/", getPersonals);
router.get("/:personalId", getPersonalById);

export default router;
