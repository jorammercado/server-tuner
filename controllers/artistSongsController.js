const express = require("express")
const artistSongs = express.Router({ mergeParams: true })
const { getArtist } = require("../queries/artists")
const {
    getAllArtistSongs,
    getOneArtistSong,
    deleteArtistSong,
    createArtistSong,
    updateArtistSong
} = require("../queries/artistSongs")
const { checkArtistSongs,
    checkArtistIndex,
    checkSongIndex,
    checkBoolean,
    checkName,
    checkArtist,
    checkTime,
    checkIndex } = require("../validations/checkArtistSongs.js")

// index, /artist/#/songs
artistSongs.get("/", checkArtistSongs, checkArtistIndex, async (req, res) => {
    const { artist_id } = req.params
    const artist = await getArtist(artist_id)
    const allArtistSongs = await getAllArtistSongs(artist_id)
    if (req.query.order) {
        allArtistSongs.sort((a, b) => {
            if (req.query.order === "asc" || req.query.order === "desc") {
                if (a.name.toLowerCase() < b.name.toLowerCase())
                    return -1
                else if (a.name.toLowerCase() > b.name.toLowerCase())
                    return 1
                else
                    return 0
            }
            else if (req.query.order === "ascArt" || req.query.order === "descArt") {
                if (a.artist.toLowerCase() < b.artist.toLowerCase())
                    return -1
                else if (a.artist.toLowerCase() > b.artist.toLowerCase())
                    return 1
                else
                    return 0
            }
            else if (req.query.order === "ascAl" || req.query.order === "descAl") {
                if (a.album.toLowerCase() < b.album.toLowerCase())
                    return -1
                else if (a.album.toLowerCase() > b.album.toLowerCase())
                    return 1
                else
                    return 0
            }
            else if (req.query.order === "ascTime" || req.query.order === "descTime") {
                const timeAString = a.time.split(":")
                const timeBString = b.time.split(":")
                const aTime = Number(timeAString[0]) * 60 + Number(timeAString[1])
                const bTime = Number(timeBString[0]) * 60 + Number(timeBString[1])
                if (aTime < bTime)
                    return -1
                else if (aTime > bTime)
                    return 1
                else
                    return 0
            }
        })
        if (req.query.order === "asc" || req.query.order === "ascArt" || req.query.order === "ascAl" || req.query.order === "ascTime")
            res.json(allArtistSongs)
        else if (req.query.order === "desc" || req.query.order === "descArt" || req.query.order === "descAl" || req.query.order === "descTime")
            res.json(allArtistSongs.reverse())
        else
            res.redirect('/order should be asc or desc')
    }
    else if (req.query.is_favorite) {
        if (req.query.is_favorite === "true")
            res.json(allArtistSongs.filter(current => {
                return current.is_favorite === true
            }))
        else if (req.query.is_favorite === "false")
            res.json(allArtistSongs.filter(current => {
                return current.is_favorite === false
            }))
        else
            res.redirect('/is_favorite should be true or false')
    }
    else
        res.json({ artist, allArtistSongs })
})

// show, /artist/#/songs/:id
artistSongs.get("/:id", checkArtistIndex, checkSongIndex, async (req, res) => {
    const { artist_id, id } = req.params
    const artistSong = await getOneArtistSong(id)
    res.json(artistSong)
})

module.exports = artistSongs