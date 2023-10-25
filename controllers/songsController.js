const express = require("express")
const songs = express.Router()
const { getAllSongs, getSong, createSong, deleteSong, updateSong } = require("../queries/songs")
const { checkSongs, checkBoolean, checkName, checkArtist, checkTime, checkIndex } = require("../validations/checkSongs.js")

// index
songs.get("/", checkSongs, async (req, res) => {
    const allSongs = await getAllSongs()
    res.status(200).json(allSongs)
})

// show
songs.get("/:id", checkIndex, async (req, res) => {
    const { id } = req.params
    const song = await getSong(id)
    res.json(song)
})

// new
songs.post("/", checkBoolean, checkName, checkArtist, checkTime, async (req,res) => {
    const song = await createSong(req.body)
    res.json(song)
})

// delete
songs.delete("/:id", checkIndex, async (req, res) => {
    const { id } = req.params
    const deletedSong = await deleteSong(id)
    res.status(200).json(deletedSong)
})

//  update
songs.put("/:id", checkName, checkArtist, checkTime, checkBoolean, checkIndex, async (req, res) => {
    const { id } = req.params
    const updatedSong = await updateSong(id, req.body)
    res.status(200).json(updatedSong)
})

module.exports = songs