/*
 * /api
 *
 */

import { NextResponse } from "next/server";
// import { headers, cookies } from "next/headers";

// next-auth
// import { getServerSession } from "next-auth/next";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request): Promise<NextResponse<{ response: string }>> {
  return await NextResponse.json({ response: "200 OK" }, { status: 200 });
}
