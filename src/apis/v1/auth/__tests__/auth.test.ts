import app from "@app";
import { Administrator, Session, User } from "@database";
import request from "supertest";

describe("api/v1/auth", () => {
  beforeAll(async () => {
    const user = await User.register("authtesting@testing.io", "test");
    await Administrator.create({ userId: user.id });
    expect(user.email).toEqual("authtesting@testing.io");
  });

  test("login with no credentials", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({});
    expect(res.status).toBe(400);
  });

  test("login with correct credentials", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "authtesting@testing.io",
      password: "test",
    });
    expect(res.status).toBe(200);
  });

  test("login with incorrect credentials", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "authtesting@testing.io",
      password: "test1",
    });
    expect(res.status).toBe(401);
  });

  test("refresh with non-admin-scoped refresh token", async () => {
    const user = await User.register("nonadminscoped@testing.io", "test");
    const session = await Session.generateUser(user);
    const res = await request(app)
      .post("/api/v1/auth/refresh")
      .set("Authorization", `Bearer ${session.accessToken}`)
      .send({
        refreshToken: session.refreshToken,
      });
    expect(res.status).toBe(401);
    expect(session.refreshToken).toBeTruthy();
  });

  test("refresh with Administrator non-admin-scoped refresh token", async () => {
    const user = await User.register(
      "administrator.notadminscoped@testing.io",
      "test"
    );
    await Administrator.create({ userId: user.id });
    const session = await Session.generateUser(user);
    const res = await request(app)
      .post("/api/v1/auth/refresh")
      .set("Authorization", `Bearer ${session.accessToken}`)
      .send({
        refreshToken: session.refreshToken,
      });
    expect(res.status).toBe(401);
    expect(session.refreshToken).toBeTruthy();
  });

  test("refresh with valid admin access token", async () => {
    const user = await User.register("refreshtesting@testing.io", "test");
    await Administrator.create({ userId: user.id });
    const admin = await Administrator.findOne({
      include: [Administrator.associations.user],
      where: { userId: user.id },
    });
    const session = await Session.generateAdmin(admin);
    const res = await request(app)
      .post("/api/v1/auth/refresh")
      .set("Authorization", `Bearer ${session.accessToken}`)
      .send({
        refreshToken: session.refreshToken,
      });
    expect(res.status).toBe(200);
  });

  test("logout with no access token", async () => {
    const resLogout = await request(app).post("/api/v1/auth/logout").send();
    expect(resLogout.status).toBe(400);
  });

  test("logout with valid admin access token", async () => {
    const user = await User.register("logouttesting@testing.io", "test");
    await Administrator.create({ userId: user.id });
    const admin = await Administrator.findOne({
      include: [Administrator.associations.user],
      where: { userId: user.id },
    });
    const newSession = await Session.generateAdmin(admin);

    const resLogout = await request(app)
      .post("/api/v1/auth/logout")
      .set("Authorization", `Bearer ${newSession.accessToken}`)
      .send();
    expect(resLogout.status).toBe(200);
    const session = await Session.findOne({
      where: { accessToken: newSession.accessToken },
    });
    expect(session).toBe(null);
  });
});
