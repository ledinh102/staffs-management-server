import express from "express";

import {
  getStaffs,
  getStaffById,
  createStaff,
  deleteStaff,
  updateStaff,
} from "../controllers/staffs.js";

const router = express.Router();

router.get("/", getStaffs);
router.get("/:staffId", getStaffById);
router.post("/create", createStaff);
router.delete("/delete/:staffId", deleteStaff);
router.put("/edit/:staffId", updateStaff);

export default router;
