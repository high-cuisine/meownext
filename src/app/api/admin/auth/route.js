import { NextResponse } from "next/server";

const AUTH_COOKIE = "admin_token";
const TOKEN = process.env.ADMIN_PASSWORD || "admin";

export async function POST(request) {
  const { password } = await request.json();
  if (password === TOKEN) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set(AUTH_COOKIE, TOKEN, {
      httpOnly: true,
      maxAge: 86400 * 7,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }
  return NextResponse.json({ ok: false, error: "Неверный пароль" }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(AUTH_COOKIE);
  return response;
}
