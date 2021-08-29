import { serve } from "https://deno.land/std@0.106.0/http/server.ts";

const server = serve({ port: 8000 });
console.log("http://localhost:8000/");

for await (const request of server) {
  if(request.url === "/"){
    request.respond({
      status: 200,
      body: await Deno.open("./client/index.html")
    });
  }
}