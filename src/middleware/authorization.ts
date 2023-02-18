import { NextFunction, Request, Response } from "express";

import { AdministratorPermissions } from "../database/models/Administrator";
import { ErrorResponse, Permissions } from "../types";

export const authorizeAdmin =
  (permission: keyof AdministratorPermissions, requiredValue: Permissions) =>
  (req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
    if (!req.user.administrator?.hasPermissions?.(permission, requiredValue)) {
      res.status(401).json({
        error: {
          title: "Unauthorized",
          description: "You do not have permissions to access this endpoint.",
          status: 401,
        },
      });
      return;
    }
    next();
  };
