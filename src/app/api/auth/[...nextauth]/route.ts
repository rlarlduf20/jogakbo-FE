import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

import { decodingJWTforExpiresAt, generateToken } from "@/lib/auth/encryption";
import { sendUserData } from "@/lib/auth/sign";
import { refreshToken } from "@/lib/auth/refresh";

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID ?? "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID ?? "",
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/signIn",
    error: "/signIn/error",
  },
  callbacks: {
    async signIn({ user, account }: any) {
      let userData = {
        socialId: user.id,
        name: user.name,
        provider: account.provider,
      };
      const identifyToken = generateToken(userData);
      const res: any = await sendUserData(identifyToken);

      if (!res.ok) {
        console.error(res);
        return false;
      }

      let access = res.headers.get("authorization");
      let refresh = res.headers.get("authorization-refresh");
      let expiresIn = decodingJWTforExpiresAt(access);
      let jogakTokens = {
        accessToken: access,
        refreshToken: refresh,
        expiresIn: expiresIn,
      };
      user.jogakTokens = jogakTokens;
      user.info = userData;
      return true;
    },
    async jwt({ token, user }: any) {
      if (user) {
        return { ...token, ...user };
      }

      if (new Date().getTime() / 1000 < token.jogakTokens.expiresIn) {
        return token;
      }
      return await refreshToken(token);
    },
    async session({ session, token }: any) {
      session.jogakTokens = token.jogakTokens;
      session.info = token.info;

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
