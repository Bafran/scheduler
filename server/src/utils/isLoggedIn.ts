import { MyContext } from "src/types";

export const isLoggedIn = (req: MyContext["req"]) => {
  if (req.session.userId) {
    return true;
  }
  return false;
};
