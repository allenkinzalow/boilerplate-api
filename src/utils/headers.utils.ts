import { Request } from "express";

export const getBearerToken = (req: Request): string => {
  const bearerHeader = req.get("Authorization");
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    return token;
  } else {
    return "";
  }
};
