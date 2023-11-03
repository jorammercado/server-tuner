const db = require("../db/dbConfig.js")

// index
const getAllArtistSongs = async (artist_id) => {
    try{
        const allArtistSongs = await db.any("SELECT * FROM songs WHERE artist_id=$1",
        artist_id)
        return allArtistSongs
    }
    catch (error) {
        return error
    }
}

const getOneArtistSong = async (id) => {
    try{
        const oneArtistSong = await db.any("SELECT * FROM songs WHERE id=$1",id)
        return oneArtistSong
    }
    catch (error) {
        return error
    }
}

const deleteArtistSong = async (id) => {
    try{
        const deletedArtistSong = await db.one(
            "DELETE FROM songs WHERE id = $1 RETURNING *", id
        )
        return deletedArtistSong
    }
    catch(error){
        return error
    }
}

const createArtistSong = async (artist_id, artistSong) => {
    try {
        const newArtistSong = await db.one(
            `INSERT INTO songs (name, artist, album, time, is_favorite, artist_id) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [artistSong.name, artistSong.artist, artistSong.album, artistSong.time, 
            artistSong.is_favorite, artist_id]
        )
        return newArtistSong
    }
    catch(error){
        return error
    }
}

const updateArtistSong = async (artistSong) => {
    try{
        const updatedSong = await db.one(
            `UPDATE songs SET name=$3, artist=$4, album=$5, time=$6,
             is_favorite=$7 WHERE id=$2 RETURNING *`,
            [artistSong.artist_id, artistSong.id, artistSong.name, 
             artistSong.artist, artistSong.album,
             artistSong.time, artistSong.isfavorite]
        )
        return updatedSong
    }
    catch(error){
        return error
    }
}



module.exports = { getAllArtistSongs,
                   getOneArtistSong,
                   deleteArtistSong,
                   updateArtistSong,
                   createArtistSong }