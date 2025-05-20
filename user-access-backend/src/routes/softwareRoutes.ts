import { Router } from "express";
import { getSoftware, createSoftware } from "../controllers/softwareController";

const router = Router();
router.get("/", getSoftware);
router.post("/", createSoftware);

export default router;
