import { Config } from "@database";
import { Serializer } from "@types";

const serializer: Serializer<Config> = {
  serialize(config: Config) {
    return {
      administrators_enabled: config.administrators_enabled,
    };
  },
};

export default serializer;
