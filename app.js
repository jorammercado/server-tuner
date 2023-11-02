const cors = require("cors")
const express = require("express")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome to Tuner")
})

const artistsController = require("./controllers/artistsController.js")
app.use("/artists", artistsController)
const songsController = require("./controllers/songsController.js")
app.use("/songs", songsController)

app.get("*", (req, res) => {
    res.status(404).send("Page not found")
})

module.exports = app