const db = require("../db/dbConfig.js")

// index
const getAllArtists = async () => {
    try{
        const allArtists = await db.any("SELECT * FROM artists")
        return allArtists
    }
    catch (error) {
        return error
    }
}

// show
const getArtist = async (id) => {
    try {
            const oneArtist = await db.one("SELECT * FROM artists WHERE id=$1", id)
            return oneArtist
    }
    catch(error){
        return error
    }
}

// create
const createArtist = async (artist) => {
    try {
        const newArtist = await db.one(
            "INSERT INTO artists (artist_name, artist_img) VALUES($1, $2) RETURNING *",
            [artist.artist_name, artist.artist_img]
        )
        return newArtist
    }
    catch(error){
        throw error
    }
}

const deleteArtist = async (id) => {
    try{
        const deletedArtist = await db.one(
            "DELETE FROM artists WHERE id = $1 RETURNING *", id
        )
        return deletedArtist
    }
    catch(error){
        return error
    }
}

const updateArtist = async (id, artist) => {
    try{
        const updatedArtist = await db.one(
            "UPDATE artists SET artist_name=$1, artist_img=$2 WHERE id=$3 RETURNING *",
            [artist.artist_name, artist.artist_img, id]
        )
        return updatedArtist
    }
    catch(error){
        return error
    }
}

module.exports = { getAllArtists, createArtist, getArtist, deleteArtist, updateArtist }