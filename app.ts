import { serve } from "https://deno.land/std@0.106.0/http/server.ts";
import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts";
import { chatConnection } from "./server/webSocket/chatRoom.ts";

const server = serve({ port: 8000 });
console.log("http://localhost:8000/");

for await (const request of server) {
  if(request.url === "/"){
    request.respond({
      status: 200,
      body: await Deno.open("./client/index.html")
    });
  }

  if(request.url === "/ws"){
    if( acceptable(request) ){
      acceptWebSocket({
        conn: request.conn,
        bufReader: request.r,
        bufWriter: request.w,
        headers: request.headers,
      })
      .then(chatConnection);
    }
  }
}