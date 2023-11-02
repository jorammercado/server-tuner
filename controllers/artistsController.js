const express = require("express")
const artists = express.Router()
const { getAllArtists, 
        createArtist, 
        getArtist, 
        deleteArtist, 
        updateArtist } = require("../queries/artists")
const { checkArtistName, 
        checkArtistIndex, 
        checkArtists } = require("../validations/checkArtists.js")

const artistSongsController = require("./artistSongsController.js")
artists.use("/:artist_id/songs", artistSongsController)

// index
artists.get("/", checkArtists, async (req, res) => {
    const allArtists = await getAllArtists()
    if(req.query.order){
        allArtists.sort((a,b) => {
            if(req.query.order==="asc"||req.query.order==="desc"){
                if(a.artist_name.toLowerCase() < b.artist_name.toLowerCase())
                    return -1
                else if (a.artist_name.toLowerCase() > b.artist_name.toLowerCase())
                    return 1
                else
                    return 0
            }
        })
        if(req.query.order==="asc")
            res.json(allArtists)
        else if(req.query.order==="desc")
            res.json(allArtists.reverse())    
        else
            res.redirect('/order should be asc or desc')
    }
    else
        res.status(200).json(allArtists)
})

// show
artists.get("/:id", checkArtistIndex, async (req, res) => {
    const { id } = req.params
    const artist = await getArtist(id)
    res.json(artist)
})

// new
artists.post("/", checkArtistName, async (req,res) => {
    const artist = await createArtist(req.body)
    res.json(artist)
})

// delete
artists.delete("/:id", checkArtistIndex, async (req, res) => {
    const { id } = req.params
    const deletedArtist = await deleteArtist(id)
    res.status(200).json(deletedArtist)
})

//  update
artists.put("/:id", checkArtistName, checkArtistIndex, async (req, res) => {
    const { id } = req.params
    const updatedArtist = await updateArtist(id, req.body)
    res.status(200).json(updatedArtist)
})

module.exports = artists