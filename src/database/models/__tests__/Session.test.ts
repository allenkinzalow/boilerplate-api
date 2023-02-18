import moment from "moment";

import Administrator from "../Administrator";
import Session from "../Session";
import User from "../User";

describe("Session model", () => {
  test("generateAccessToken", () => {
    const accessToken = Session.generateAccessToken(1);
    expect(accessToken).toBeTruthy();
  });

  test("generateUser", async () => {
    const user = await User.create({
      email: "session.user@testing.io",
      password: "test",
    });
    const session = await Session.generateUser(user);
    expect(
      moment(session.expiresAt).startOf("day").toDate().toDateString()
    ).toEqual(moment().add(30, "days").startOf("day").toDate().toDateString());
    expect(session.scope).toBe("user");
    expect(session.userId).toBe(user.id);
  });

  test("generateAdmin", async () => {
    const user = await User.register(
      "session.administrator@testing.io",
      "test"
    );
    await Administrator.create({ userId: user.id });
    const admin = await Administrator.findOne({
      include: [Administrator.associations.user],
      where: { userId: user.id },
    });
    const session = await Session.generateAdmin(admin);
    expect(
      moment(session.expiresAt).startOf("day").toDate().toDateString()
    ).toEqual(moment().add(30, "days").startOf("day").toDate().toDateString());
    expect(session.scope).toBe("admin");
    expect(session.userId).toBe(user.id);
  });
});
