import express from "express";

import { getConfig } from "./config.controller";
import configSerializer from "./config.serializer";

const router = express.Router();

router.get("/", getConfig);

export { configSerializer };

export default router;
