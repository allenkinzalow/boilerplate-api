import express from "express";

import { authenticateAdmin } from "../../middleware/authentication";
import administrators from "./administrators";
import auth from "./auth";
import config from "./config";

const router = express.Router();

router.use("/administrators", authenticateAdmin, administrators);
router.use("/auth", auth);
router.use("/config", config);

export default router;
