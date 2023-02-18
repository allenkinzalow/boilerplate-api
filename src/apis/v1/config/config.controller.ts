import { Config } from "@database";
import { RequestHandler } from "express";

import serializer from "./config.serializer";

/**
 * GET /api/v1/admin/config
 */
const getConfig: RequestHandler = async (_, res) => {
  const config = await Config.findOne();
  res.json(config ? serializer.serialize(config) : {});
};

export { getConfig };
