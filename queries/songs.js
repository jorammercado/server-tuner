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

module.exports = { getAllSongs, getSong }