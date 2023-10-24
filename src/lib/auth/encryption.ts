import "server-only";
import jwt from "jsonwebtoken";

const secret: any = process.env.SECRET_KEY;

export const generateToken = (userData: any) => {
  const { socialId, name, provider } = userData;
  const token = jwt.sign(
    {
      socialId,
      name,
      provider,
    },
    secret,
    {
      algorithm: "HS512",
    }
  );

  return token;
};
