import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

import { generateToken } from "@/lib/auth/encryption";
import { sendUserData } from "@/lib/auth/sign";

let jogakAccessToken: string;
let jogakRefreshToken: string;

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

      const access = res.headers.get("authorization");
      const refresh = res.headers.get("authorization-refresh");
      jogakAccessToken = access;
      jogakRefreshToken = refresh;

      return true;
    },
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = jogakAccessToken;
        token.refreshToken = jogakRefreshToken;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
