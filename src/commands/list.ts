import pingHandler from "./handlers/ping"

export default [
  {
    name: "ping",
    description: "Replies back with Pong!",
    execute: pingHandler
  },
]