import { Permissions } from "../../../types";
import Administrator from "../Administrator";
import User from "../User";

describe("Administrator model", () => {
  test("user association should exists", async () => {
    const user = await User.register("administrator@testing.io", "test");
    await Administrator.create({ userId: user.id });
    const admin = await Administrator.findOne({
      include: [Administrator.associations.user],
      where: { userId: user.id },
    });
    expect(admin.user.id).toEqual(user.id);
  });

  test("permissions should save", async () => {
    const user = await User.register(
      "administrator.permissions@testing.io",
      "test"
    );
    const admin = await Administrator.create({
      userId: user.id,
      permissions: { administrators: Permissions.EDIT },
    });

    expect(admin.permissions).toEqual({ administrators: Permissions.EDIT });
  });
});
