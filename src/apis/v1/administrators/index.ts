import express from "express";

import { authorizeAdmin } from "../../../middleware/authorization";
import { Permissions } from "../../../types";
import { getAdministrators } from "./administrators.controller";

const router = express.Router();

router.get(
  "/",
  authorizeAdmin("administrators", Permissions.VIEW),
  getAdministrators
);

export default router;
