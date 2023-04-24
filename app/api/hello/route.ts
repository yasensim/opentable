export async function GET(request: Request) {
  return new Response(JSON.stringify({meassage: "Hello, Next.js!"}),  {status: 200, headers: {'Content-Type': 'application/json'}})
}

