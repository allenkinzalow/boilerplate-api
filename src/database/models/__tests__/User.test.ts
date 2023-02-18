import User from "../User";

describe("User model", () => {
  test("should insert with default params", async () => {
    const user = await User.create({
      email: "user.1@testing.io",
      password: "test",
    });
    expect(user.email).toEqual("user.1@testing.io");
  });
  test("should register a user", async () => {
    const user = await User.register("user.2@testing.io", "test");
    expect(user.email).toEqual("user.2@testing.io");
  });
  test("should throw an error for existing user", async () => {
    try {
      const user = await User.register("user.2@testing.io", "test");
      expect(user.email).toEqual("user.2@testing.io");
    } catch (error) {
      expect(error.toString()).toContain("User already exists");
    }
  });
});
