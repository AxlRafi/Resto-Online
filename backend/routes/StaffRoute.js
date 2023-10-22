import express from "express";
import {
  getStaffs,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/Staffs.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();
router.get("/staffs", verifyUser, getStaffs);
router.get("/staffs/:id", verifyUser, getStaffById);
//saat belum ada user admin
// router.post('/users', createUser);
//saat sudah ada user admin
router.post("/staffs", verifyUser, adminOnly, createStaff);
router.patch("/staffs/:id", verifyUser, adminOnly, updateStaff);
router.delete("/staffs/:id", verifyUser, adminOnly, deleteStaff);
export default router;
