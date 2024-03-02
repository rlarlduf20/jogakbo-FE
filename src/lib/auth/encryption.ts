// import "server-only";
import jwt from "jsonwebtoken";

const secret: any = process.env.SECRET_KEY;

export const generateToken = (userData: any) => {
  const { socialId, name, provider } = userData;
  const token = jwt.sign(
    {
      UserUUID: socialId,
      Nickname: name,
      Provider: provider,
    },
    secret,
    {
      algorithm: "HS512",
    }
  );

  return token;
};

export const decodingJWTforExpiresAt = (accessToken: string) => {
  const res: any = jwt.decode(accessToken);

  return res?.exp;
};
