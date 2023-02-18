import { Administrator } from "@database";
import { Serializer } from "@types";

import userSerializer from "../users/users.serializer";

const administratorSerializer: Serializer<Administrator> = {
  serialize(admin: Administrator) {
    return {
      lastLoginDate: admin.lastLoginDate?.toDateString(),
      permissions: admin.permissions,
      createdAt: admin.createdAt.toDateString(),
      deletedAt: admin.deletedAt?.toDateString(),
      id: admin.id,
      user: admin.user ? userSerializer.serialize(admin.user) : undefined,
    };
  },
};

export default administratorSerializer;
