import express from "express";
import {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
  deleteCarts,
} from "../controllers/Cart.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();
router.get("/carts", verifyUser, getCarts);
router.get("/carts/:id", verifyUser, getCartById);
router.post("/carts", verifyUser, createCart);
router.patch("/carts/:id", verifyUser, updateCart);
router.delete("/carts/:id", verifyUser, deleteCart);
router.delete("/cart/:id", verifyUser, deleteCarts);
export default router;
