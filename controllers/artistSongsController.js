const express = require("express")
const artistSongs = express.Router({ mergeParams: true })
const { getArtist } = require("../queries/artists")
const { getAllArtistSongs,
    getOneArtistSong,
    deleteArtistSong,
    createArtistSong,
    updateArtistSong
} = require("../queries/artistSongs")
const { checkArtistSongs,
    checkArtistIndex,
    checkSongIndex,
    checkFavBoolean,
    checkSongName,
    checkArtistName,
    checkArtistSongTime
} = require("../validations/checkArtistSongs.js")

// index, /artist/#/songs
artistSongs.get("/", checkArtistSongs, checkArtistIndex, async (req, res) => {
    const { artist_id } = req.params
    const artist = await getArtist(artist_id)
    let allArtistSongs = await getAllArtistSongs(artist_id)
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
            res.json({ ...artist, allArtistSongs })
        else if (req.query.order === "desc" || req.query.order === "descArt" || req.query.order === "descAl" || req.query.order === "descTime") {
            allArtistSongs = allArtistSongs.reverse()
            res.json({ ...artist, allArtistSongs })
        }
        else
            res.redirect('/order should be asc or desc')
    }
    else if (req.query.is_favorite) {
        if (req.query.is_favorite === "true") {
            allArtistSongs = allArtistSongs.filter(current => {
                return current.is_favorite === true
            })
            res.json({ ...artist, allArtistSongs })
        }
        else if (req.query.is_favorite === "false") {
            allArtistSongs = allArtistSongs.filter(current => {
                return current.is_favorite === false
            })
            res.json({ ...artist, allArtistSongs })
        }
        else
            res.redirect('/is_favorite should be true or false')
    }
    else
        res.json({ ...artist, allArtistSongs })
})

// show, /artist/#/songs/:id
artistSongs.get("/:id", checkArtistIndex, checkSongIndex, async (req, res) => {
    const { artist_id, id } = req.params
    const artistSong = await getOneArtistSong(id)
    res.json(artistSong)
})

// new, /artist/#/songs
artistSongs.post("/", checkFavBoolean,
    checkSongName,
    checkArtistName,
    checkArtistSongTime,
    checkArtistIndex, async (req, res) => {
        const { artist_id } = req.params
        const artistSong = await createArtistSong(artist_id, req.body)
        res.json(artistSong)
    })

// delete /artist/#/songs/#
artistSongs.delete("/:id", checkSongIndex, checkArtistIndex, async (req, res) => {
    const { id } = req.params
    const deletedArtistSong = await deleteArtistSong(id)
    res.status(200).json(deletedArtistSong)
})

//  update /artist/#/songs/#
artistSongs.put("/:id", checkSongName,
    checkArtistName,
    checkArtistSongTime,
    checkFavBoolean,
    checkSongIndex,
    checkArtistIndex, async (req, res) => {
        const { id, artist_id } = req.params
        const updatedArtistSong = await updateArtistSong({ artist_id, id, ...req.body })
        res.status(200).json(updatedArtistSong)
    })

module.exports = artistSongs