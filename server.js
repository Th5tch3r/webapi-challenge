const express = require('express');
const helmet = require('helmet');

const db = require("./data/dbConfig");

const server = express();

const actionsRouter = require("./data/routers/actionsRouter");
const projectsRouter = require("./data/routers/projectsRouter");

server.use(helmet())
server.use(express.json());
// server.use(logger);
server.use("/actions", actionsRouter);
server.use("/projects", projectsRouter);

server.get("/", async (req, res) => {
    try {
        const info = await db('info');
        const motd = process.env.MOTD || "HELLO!";
        res.status(200).json({message: motd, info})

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Cannot retrieve the info!'})
    }
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