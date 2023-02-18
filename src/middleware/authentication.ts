import { NextFunction, Request, Response } from "express";
import passport from "passport";

import { ErrorResponse } from "../types";

export const authenticateAdmin = (
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  passport.authenticate("jwt-admin", { session: false }, function (err, user) {
    if (!user) {
      res.status(401).json({
        error: {
          title: "Unauthorized",
          description: "Please log in and try again.",
          status: 401,
        },
      });
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};
