const { getAllArtists } = require("../queries/artists")

const checkArtists = async (req, res, next) => {
    const allArtists = await getAllArtists()
    if(allArtists[0]){
        return next()
    }
    else{
        res.status(500).json({error: "server error - getAllArtist"})
    }
}

const checkArtistName = (req, res, next) => {
    if(req.body.artist_name){
        return next()
    }
    else{
        res.status(400).json({error: "artist_name is required"})
    }
}

const checkArtistIndex = async (req, res, next) =>{
    const allArtists = await getAllArtists()
    const {id} = req.params
    const ids = allArtists.map(e => e.id)
    if(ids.includes(Number(id)))
        return next()
    else
    res.status(404).redirect("/error - invalid artist id")
}

module.exports = { checkArtistName, checkArtistIndex, checkArtists }