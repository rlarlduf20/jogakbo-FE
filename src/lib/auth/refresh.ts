import { JWT } from "next-auth/jwt";
import { decodingJWTforExpiresAt } from "./encryption";

export async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(`${process.env.SERVER_URL}/refresh`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.jogakTokens.accessToken}`,
      "Authorization-refresh": `Bearer ${token.jogakTokens.refreshToken}`,
    },
  });

  let access: any = res.headers.get("authorization");
  let refresh = res.headers.get("authorization-refresh");
  let expiresIn = decodingJWTforExpiresAt(access);

  let jogakTokens: any = {
    accessToken: access,
    refreshToken: refresh,
    expiresIn: expiresIn,
  };

  return {
    ...token,
    jogakTokens: jogakTokens,
  };
}
