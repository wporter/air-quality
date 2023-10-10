import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export const authenticate = async (restrictions = {}) => {
  const session = await getServerSession(authOptions);

  if (!session.user) {
    // 401 - authen error... user isn't signed in
    return { message: "Invalid Authentication Credentials.", auth: 401 };
  }

  const authorized = Object.entries(restrictions).some(
    ([key, value]) => session.user.roles[key] === value,
  );

  if (!authorized && Object.keys(restrictions) > 0) {
    // 403 - auth error... not correct perms
    return { message: `Forbidden Access`, auth: 403 };
  }

  return {
    message: null,
    auth: 200,
    uid: session.user.id,
    user: session.user,
  };
};
