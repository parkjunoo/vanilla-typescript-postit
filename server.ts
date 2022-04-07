import express from "express";

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
  }
}

const server = new Server().app;
server.set("port", 3000);
server
  .listen(server.get("port"), () => {
    console.log(`${server.get("port")} server is Running`);
  })
  .on("error", (err) => {
    console.log(`Error message ${err}`);
  });
