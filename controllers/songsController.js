const express = require("express")
const songs = express.Router()
const { getAllSongs, getSong, createSong, deleteSong } = require("../queries/songs")
const { checkBoolean, checkName, checkArtist, checkTime, checkIndex } = require("../validations/checkSongs.js")

// index
songs.get("/", async (req, res) => {
    const allSongs = await getAllSongs()
    if(allSongs[0]){
        res.status(200).json(allSongs)
    }
    else{
        res.status(500).json({error: "server error"})
    }
})

// show
songs.get("/:id", checkIndex, async (req, res) => {
    const { id } = req.params
    const song = await getSong(id)
    if(song){
        res.json(song)
    }
    else{
        res.status(404).json({error: "not found" })
    }
})

// new
songs.post("/", checkBoolean, checkName, checkArtist, checkTime, async (req,res) => {
    const song = await createSong(req.body)
    res.json(song)
})

// delete
songs.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedSong = await deleteSong(id)
    if(deletedSong.id)
        res.status(200).json(deletedSong)
    else
        res.status(404).json("Song not found")
})

module.exports = songs