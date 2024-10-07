import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

import { decodingJWTforExpiresAt, generateToken } from "@/lib/auth/encryption";
import { refreshToken } from "@/lib/auth/refresh";
import { sendUserData } from "@/lib/auth/sign";

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
      const userData = {
        socialId: user.id,
        name: user.name,
        provider: account.provider,
      };
      const identifyToken = generateToken(userData);
      const res: any = await sendUserData(identifyToken);

      if (!res.ok) {
        // console.error(res);
        return false;
      }

      const access = res.headers.get("authorization");
      const refresh = res.headers.get("authorization-refresh");
      const expiresIn = decodingJWTforExpiresAt(access);
      const jogakTokens = {
        accessToken: access,
        refreshToken: refresh,
        expiresIn,
      };
      const tmp = user;
      tmp.jogakTokens = jogakTokens;
      tmp.info = userData;
      return true;
    },
    async jwt({ token, user }: any) {
      if (user) {
        return { ...token, ...user };
      }

      if (new Date().getTime() / 1000 < token.jogakTokens.expiresIn) {
        return token;
      }
      return refreshToken(token);
    },
    async session({ session, token }: any) {
      const tmp = session;
      tmp.jogakTokens = token.jogakTokens;
      tmp.info = token.info;

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
