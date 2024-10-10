import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const withAuthList = [
  "/my",
  "/my/profile",
  "/browse",
  "/album",
  "/addAlbum",
  "/addMate",
];
const withOutAuthList = ["/signIn", "/"];

const withAuth = async (req: NextRequest, token: boolean) => {
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/signIn";

    return NextResponse.redirect(url);
  }
};

const withOutAuth = async (req: NextRequest, token: boolean) => {
  const url = req.nextUrl.clone();

  if (token) {
    url.pathname = "/my";
    return NextResponse.redirect(url);
  }
};

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const {
    nextUrl: { pathname },
  } = req;

  const isWithAuth = withAuthList.includes(pathname);
  const isWithOutAuth = withOutAuthList.includes(pathname);

  if (isWithAuth) return withAuth(req, !!token);
  if (isWithOutAuth) return withOutAuth(req, !!token);
}

export const config = {
  matcher: [...withAuthList, ...withOutAuthList],
};
