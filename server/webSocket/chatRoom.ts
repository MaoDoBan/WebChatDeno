import { WebSocket, isWebSocketCloseEvent } from "https://deno.land/std/ws/mod.ts";

const sockets: WebSocket[] = [];

interface BroadcastObject{
  name: string,
  message: string
}
function broadcastEvent(messageObject: BroadcastObject){
  for(const socket of sockets){
    if(!socket) continue;

    socket.send( JSON.stringify(messageObject) );
  }
}

export const chatConnection = async (serverSocket: WebSocket) => {
  console.log("New websocket connection!");

  const socketIndex = sockets.push(serverSocket) - 1;
  //console.log(sockets);

  for await (const event of serverSocket){
    console.log(event);

    if(isWebSocketCloseEvent(event)){
      delete sockets[socketIndex];
      break;
    }

    if(typeof event === "string"){
      const receivedObject = JSON.parse(event) as BroadcastObject;
      broadcastEvent(receivedObject);
    }
  }
}