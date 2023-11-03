const { getAllArtistSongs } = require("../queries/artistSongs")
const { getAllArtists } = require("../queries/artists")

const checkArtistSongs = async (req, res, next) => {
    const { artist_id } = req.params
    const allArtistSongs = await getAllArtistSongs(artist_id)
    if (allArtistSongs[0]) {
        return next()
    }
    else {
        res.status(500).json({ error: "server error - getAllArtistSongs" })
    }
}

const checkArtistIndex = async (req, res, next) => {
    const allArtist = await getAllArtists()
    const { artist_id } = req.params
    const artistIds = allArtist.map(e => e.id)
    if (artistIds.includes(Number(artist_id)))
        return next()
    else
        res.status(404).redirect("/error - invalid artist id")
}

const checkSongIndex = async (req, res, next) => {
    const { artist_id, id } = req.params
    const allArtistSongs = await getAllArtistSongs(artist_id)
    const ids = allArtistSongs.map(e => e.id)
    if (ids.includes(Number(id)))
        return next()
    else
        res.status(404).redirect("/error - invalid song id of artist")
}

const checkSongName = (req, res, next) => {
    if (req.body.name) {
        return next()
    }
    else {
        res.status(400).json({ error: "name is required" })
    }
}

const checkArtistName = (req, res, next) => {
    if (req.body.artist)
        return next()
    else
        res.status(400).json({ error: "artist is required" })
}

const checkArtistSongTime = (req, res, next) => {
    const { time } = req.body
    if (time === undefined || time === "")
        return next()
    else {
        if (/:/.test(time) === false)
            res.status(400).json({ error: "time requires colon" })
        else {
            const timeArr = time.split(":")
            if (timeArr.length !== 2)
                res.status(400).json({ error: "time requires 2 numbers separated by colon" })
            else {
                if (/^[0-9]+$/.test(timeArr[0]) && /^[0-9]+$/.test(timeArr[1]))
                    return next()
                else
                    res.status(400).json({ error: "values separated by colon not numbers" })
            }
        }
    }
}

const checkFavBoolean = (req, res, next) => {
    const { is_favorite } = req.body
    if (is_favorite == "true" ||
        is_favorite == "false" ||
        is_favorite == undefined ||
        typeof is_favorite == "boolean")
        return next()
    else
        res.status(400).json({ error: "is_favorite must be a boolean value" })
}

module.exports = {
    checkFavBoolean,
    checkSongName,
    checkArtistName,
    checkArtistSongTime,
    checkSongIndex,
    checkArtistIndex,
    checkArtistSongs
}