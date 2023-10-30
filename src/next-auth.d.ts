import NextAuth, { DefaultSession, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      name?: string;
    } & DefaultSession["user"];

    jogakTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id?: string;
      name?: string;
    } & DefaultSession["user"];

    jogakTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: string;
    };
  }
}
