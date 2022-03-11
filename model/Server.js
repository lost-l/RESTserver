const express = require("express"),
    cors = require("cors");
const { DbConnection } = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Connection DB (Mongoose)
        this.connectDB();
        this.routes();
        this.middlewaress();
    }

    async connectDB() {
        await DbConnection();
    }

    middlewaress() {
        // CORS
        this.app.use(cors());
        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use("/api/users", require("../router/user.router"));
    }

    listen() {
        // this.app.listen(this.port, () => {
        //     console.log(`Server on http://localhost:${this.port}`);
        // })
        this.app.listen(this.port);
    }
}

module.exports = Server;