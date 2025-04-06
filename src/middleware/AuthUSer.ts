import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const AuthUSer = async (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) return false;

  try {
    const extractAuthUserInfo = jwt.verify(token, "default_sec_key");
    if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default AuthUSer;
