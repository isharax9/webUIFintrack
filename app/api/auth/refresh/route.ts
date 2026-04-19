import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  
  // Extract refresh token from cookie string manually or using a helper
  const refreshToken = cookieHeader
    .split("; ")
    .find((row) => row.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) {
    return NextResponse.json({ message: "No refresh token" }, { status: 401 });
  }

  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const payload = await response.json().catch(() => ({ message: "Invalid response" }));
  const nextResponse = NextResponse.json(payload, { status: response.status });
  
  // If the backend returns a new access token, we might want to also rotate the refresh token if provided
  // But for now keeping it simple as per current backend implementation
  return nextResponse;
}
