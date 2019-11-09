const express = require('express');

const server = express();

const actionsRouter = require("./data/routers/actionsRouter");
const projectsRouter = require("./data/routers/projectsRouter");

server.use(express.json());
// server.use(logger);
server.use("/actions", actionsRouter);
server.use("/projects", projectsRouter);

server.get("/", (req, res) => {
    res.status(200).json({message: "WELCOME TO THATCHER'S SPRINT"})
});

function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
            "host"
        )}`
    );
    next();
}

module.exports = server;