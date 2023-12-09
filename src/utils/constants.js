import { env } from "~/config/environment";

export const __PROD__ = env.BUILD_MODE === "production";
export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/;
export const OBJECT_ID_RULE_MESSAGE =
  "Your string fails to match the Object Id pattern!";
export const WHITELIST_DOMAINS = ["http://localhost:5173"];
