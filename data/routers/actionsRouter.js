const express = require("express");

const db = require("../helpers/actionModel");

const server = express.Router();

server.use(express.json());

//GET
server.get("/", (req, res) => {
    db.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(error => {
            res.status(500).json({error: "GET / error", error})
        })
});

//GET by ID
server.get("/:id", validateUserId, (req, res) => {
    const id = req.params.id;
    db.get(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({ error: "GET /:id error", error})
        })
})

//POST
server.post("/", validateUserId, (req, res) => {
    const body = req.body;
    db.insert(body)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            res.status(500).json({error: "POST / error", error})
        })
})

//PUT or Update
server.put("/:id", validateUserId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(error => {
            res.status(500).json({error: "PUT /:id error", error})
        })
});

//DELETE
server.delete("/:id", validateUserId, (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(error => {
            res.status(500).json({error: "FAILED TO DELETE", error})
        })
})

//MIDDLEWARE
function validateUserId (req, res, next) {
    let id = req.params.id;
    db.get(id)
        .then(actions => {
            if (actions) {
                next();
            } else {
                res.status(400).json({message: "Id is not valid"})
            }
        })
        .catch(error => {
            res.status(500).json({ message: "something is wrong with middleware", error})
        })
}

module.exports = server;