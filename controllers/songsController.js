const express = require("express")
const songs = express.Router()
const { getAllSongs, 
        getSong, 
        createSong, 
        deleteSong, 
        updateSong } = require("../queries/songs")
const { checkSongs, 
        checkBoolean, 
        checkName, 
        checkArtist, 
        checkTime, 
        checkIndex } = require("../validations/checkSongs.js")

// index
songs.get("/", checkSongs, async (req, res) => {
    const allSongs = await getAllSongs()
    if(req.query.order){
        allSongs.sort((a,b) => {
            if(req.query.order==="asc"||req.query.order==="desc"){
                if(a.name.toLowerCase() < b.name.toLowerCase())
                    return -1
                else if (a.name.toLowerCase() > b.name.toLowerCase())
                    return 1
                else
                    return 0
            }
            else if(req.query.order==="ascArt"||req.query.order==="descArt"){
                if(a.artist.toLowerCase() < b.artist.toLowerCase())
                    return -1
                else if (a.artist.toLowerCase() > b.artist.toLowerCase())
                    return 1
                else
                    return 0
            }
            else if(req.query.order==="ascAl"||req.query.order==="descAl"){
                if(a.album.toLowerCase() < b.album.toLowerCase())
                    return -1
                else if (a.album.toLowerCase() > b.album.toLowerCase())
                    return 1
                else
                    return 0
            }
            else if(req.query.order==="ascTime"||req.query.order==="descTime"){
                const timeAString = a.time.split(":")
                const timeBString = b.time.split(":")
                const aTime = Number(timeAString[0])*60+Number(timeAString[1]) 
                const bTime = Number(timeBString[0])*60+Number(timeBString[1])
                if(aTime < bTime)
                    return -1
                else if (aTime > bTime)
                    return 1
                else
                    return 0
            }
        })
        if(req.query.order==="asc"||req.query.order==="ascArt"||req.query.order==="ascAl"||req.query.order==="ascTime")
            res.json(allSongs)
        else if(req.query.order==="desc"||req.query.order==="descArt"||req.query.order==="descAl"||req.query.order==="descTime")
            res.json(allSongs.reverse())    
        else
            res.redirect('/order should be asc or desc')
    }
    else if(req.query.is_favorite){
        if(req.query.is_favorite==="true")
            res.json(allSongs.filter(current => { 
                return current.is_favorite === true
            }))
        else if(req.query.is_favorite==="false")
            res.json(allSongs.filter(current => { 
                return current.is_favorite === false
            }))
        else
            res.redirect('/is_favorite should be true or false')
    }
    else
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