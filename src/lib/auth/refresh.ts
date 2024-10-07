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

  const access: any = res.headers.get("authorization");
  const refresh = res.headers.get("authorization-refresh");
  const expiresIn = decodingJWTforExpiresAt(access);

  const jogakTokens: any = {
    accessToken: access,
    refreshToken: refresh,
    expiresIn,
  };

  return {
    ...token,
    jogakTokens,
  };
}
