import bodyParser from "body-parser";
import compress from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";

import apis from "../apis";
import strategies from "./passport";

const app = express();

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable authentication
app.use(passport.initialize());
passport.use("jwt-admin", strategies.jwtAdmin);
passport.use("jwt-user", strategies.jwtUser);

app.use("/api", apis);

export default app;
