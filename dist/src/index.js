"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const config_1 = require("./config");
const { port } = config_1.default;
(async () => {
    try {
        const server = new server_1.Server(port);
        await server.init();
        server.start();
    }
    catch (error) {
        console.log(error);
    }
})();
//# sourceMappingURL=index.js.map