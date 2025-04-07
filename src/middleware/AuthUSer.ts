import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";
type Authuser = {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};
const AuthUSer = async (req: NextRequest): Promise<Authuser | null> => {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) return null;

  try {
    const extractAuthUserInfo = jwt.verify(
      token,
      "default_sec_key"
    ) as JwtPayload;

    const user: Authuser = {
      id: extractAuthUserInfo.id as string,
      email: extractAuthUserInfo.email as string,
      role: extractAuthUserInfo.role as string,
      iat: extractAuthUserInfo.iat as number,
      exp: extractAuthUserInfo.exp as number,
    };
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default AuthUSer;
