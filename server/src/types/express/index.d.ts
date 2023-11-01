import { AuthPayload } from "../auth.type";

export {};

declare global {
  namespace Express {
    interface User extends AuthPayload {}
  }
}
