import { User } from "@database";
import { Serializer } from "@types";

const userSerializer: Serializer<User> = {
  serialize(user: User) {
    return {
      email: user.email?.toString(),
      first_name: user.first_name?.toString(),
      last_name: user.last_name?.toString(),
      createdAt: user.createdAt.toDateString(),
      deletedAt: user.deletedAt?.toDateString(),
      id: user.id,
      uuid: user.uuid,
      updatedAt: user.updatedAt?.toDateString(),
    };
  },
};

export default userSerializer;
