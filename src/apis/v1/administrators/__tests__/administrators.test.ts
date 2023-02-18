import app from "@app";
import { Administrator, Session, User } from "@database";
import request from "supertest";

import { Permissions } from "../../../../types";

describe("api/v1/administrators", () => {
  let accessToken: string;
  beforeAll(async () => {
    const authorizedUser = await User.register(
      "administrators@testing.io",
      "test"
    );
    await Administrator.create({
      userId: authorizedUser.id,
      permissions: { administrators: Permissions.DELETE },
    });
    const admin = await Administrator.findOne({
      include: [Administrator.associations.user],
      where: { userId: authorizedUser.id },
    });
    const session = await Session.generateAdmin(admin);
    accessToken = session.accessToken;
    expect(accessToken).toBeTruthy();
  });

  test("getAdministrators should be gated by authentication", async () => {
    const res = await request(app).get("/api/v1/administrators");
    expect(res.status).toBe(401);
  });

  test("getAdministrators should be gated by administrators view permission", async () => {
    const unauthorizedUser = await User.register(
      "administrator.nopermissions@testing.io",
      "test"
    );
    await Administrator.create({ userId: unauthorizedUser.id });
    const admin = await Administrator.findOne({
      include: [Administrator.associations.user],
      where: { userId: unauthorizedUser.id },
    });
    const session = await Session.generateAdmin(admin);

    const res = await request(app)
      .get("/api/v1/administrators")
      .set("Authorization", `Bearer ${session.accessToken}`);
    expect(res.status).toBe(401);
  });

  test("getAdministrators should return successful for authorized administrator", async () => {
    const res = await request(app)
      .get("/api/v1/administrators")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
  });
});
