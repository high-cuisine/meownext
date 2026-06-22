import { NextResponse } from "next/server";
import { getContent, setContent } from "@/lib/content";

const AUTH_COOKIE = "admin_token";
const TOKEN = process.env.ADMIN_PASSWORD || "admin";

function isAuthorized(request) {
  return request.cookies.get(AUTH_COOKIE)?.value === TOKEN;
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getContent());
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await request.json();
  setContent(data);
  return NextResponse.json({ ok: true });
}
