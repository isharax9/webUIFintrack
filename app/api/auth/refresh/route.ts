import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function POST(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";

  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie,
    },
    credentials: "include",
    body: JSON.stringify({}),
  });

  const payload = await response.json().catch(() => ({ message: "Invalid response" }));
  const nextResponse = NextResponse.json(payload, { status: response.status });
  const setCookie = response.headers.get("set-cookie");
  if (setCookie) nextResponse.headers.set("set-cookie", setCookie);
  return nextResponse;
}
