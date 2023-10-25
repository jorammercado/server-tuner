const db = require("../db/dbConfig.js")

// index
const getAllSongs = async () => {
    try{
        const allSongs = await db.any("SELECT * FROM songs")
        return allSongs
    }
    catch (error) {
        return error
    }
}

// show
const getSong = async (id) => {
    //console.log(id, typeof id)
    try {
        // if(Number.isInteger(id/1)){
            const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id)
            return oneSong
        // }
        // else{
        //     const oneSong = await db.one("SELECT * FROM colors WHERE id=$[id]", {id: id})
        //     return oneSong
        // }
    }
    catch(error){
        return error
    }
}

// create
const createSong = async (song) => {
    try {
        const newSong = await db.one(
            "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [song.name, song.artist, song.album, song.time, song.is_favorite]
        )
        return newSong
    }
    catch(error){
        throw error
    }
}

module.exports = { getAllSongs, createSong, getSong }