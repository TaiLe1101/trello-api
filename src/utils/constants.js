// DevT | constants file

import { env } from "~/config/environment";

export const constants = {
  __PROD__: env.BUILD_MODE === "production",
  OBJECT_ID_RULE: /^[0-9a-fA-F]{24}$/,
  OBJECT_ID_RULE_MESSAGE: "Your string fails to match the Object Id pattern!",
};
