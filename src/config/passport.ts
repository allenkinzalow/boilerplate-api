import { Administrator, User } from "@database";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import config from "./dotenv";

const jwtOptions = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
};

const jwtAdmin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const administrator = await Administrator.findByPk(payload.sub, {
      include: [Administrator.associations.user],
    });
    if (administrator) return done(null, { administrator });
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

const jwtUser = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findByPk(payload.sub);
    if (user) return done(null, { user });
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

const strategies = { jwtAdmin, jwtUser };

export default strategies;
