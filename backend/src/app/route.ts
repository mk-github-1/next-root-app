import {} from "next";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function get(request: Request) {
  return await new Response(JSON.stringify({ response: "200 OK" }), { status: 200 });
}
