"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./server/Server");
Server_1.server.listen(process.env.PORT || 3232, () => {
    console.log(`servidor on! PORT: ${process.env.PORT || 3232}`);
});
