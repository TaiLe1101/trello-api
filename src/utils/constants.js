// DevT | constants file

import { env } from "~/config/environment";

export const constants = {
  __PROD__: env.ENV === "production",
};
