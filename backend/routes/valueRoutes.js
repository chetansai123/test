import { Router } from "express";
const router = Router();
import * as ValueController from "../controller/valueController.js"
router.get("/", ValueController.getStocks);

export default router;