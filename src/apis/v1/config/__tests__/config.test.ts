import app from "@app";
import request from "supertest";

describe("api/v1/config", () => {
  test("getConfig should return config", async () => {
    const res = await request(app).get("/api/v1/config");
    expect(res.body).toMatchSnapshot();
  });
});
