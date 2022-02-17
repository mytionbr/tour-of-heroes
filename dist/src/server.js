"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const database = require("./database");
const heroRoute_1 = require("./routes/heroRoute");
const path = require("path");
class Server {
    constructor(port = 3000) {
        this.port = port;
        this.app = express();
        this.database = database;
    }
    async init() {
        this.setupExpress();
        this.setupClient();
        await this.setupDatabase();
        await this.setupRoutes();
    }
    setupRoutes() {
        const rootURL = "/api";
        const heroRoutes = new heroRoute_1.HeroRoute().getRoutes();
        this.app.use(rootURL + '/heroes', heroRoutes);
    }
    setupExpress() {
        this.app.use(bodyParser.json());
        this.app.use(cors({ origin: '*' }));
    }
    async setupDatabase() {
        await this.database.connect();
    }
    setupClient() {
        this.app.use(express.static(path.join(__dirname, '../client/build')));
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/build/index.html'));
        });
    }
    start() {
        this.server = this.app.listen(this.port, () => {
            console.log('Server listening on port ' + this.port);
        });
    }
    async close() {
        await this.database.close();
        if (this.server) {
            await this.server.close();
        }
    }
    getApp() {
        return this.app;
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map