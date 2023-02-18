import express from "express";

import { login, logout, refresh } from "./auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);

export default router;
