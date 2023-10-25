const { getAllSongs } = require("../queries/songs")

const checkSongs = async (req, res, next) => {
    const allSongs = await getAllSongs()
    if(allSongs[0]){
        return next()
    }
    else{
        res.status(500).json({error: "server error"})
    }
}

const checkName = (req, res, next) => {
    if(req.body.name){
        //console.log("checking name...")
        return next()
    }
    else{
        res.status(400).json({error: "name is required"})
    }
}

const checkArtist = (req, res, next) => {
    if(req.body.artist)
        return next()
    else
        res.status(400).json({error: "artist is required"})
}

const checkTime = (req, res, next) => {
    const { time } = req.body
    if(time===undefined)
        return next()
    else{
        if(/:/.test(time)===false)
            res.status(400).json({error: "time requires colon"})
        else{
            const timeArr = time.split(":")
            if(timeArr.length!==2)
                res.status(400).json({error: "time requires 2 numbers separated by colon"})
            else{
                if(/^[0-9]+$/.test(timeArr[0])&&/^[0-9]+$/.test(timeArr[1]))
                    return next()
                else
                res.status(400).json({error: "values separated by colon not numbers"})
            }
        }
    }
}

const checkBoolean = (req, res, next) => {
    const { is_favorite } = req.body
    if( is_favorite == "true"    || 
        is_favorite == "false"   || 
        is_favorite == undefined || 
        typeof is_favorite == "boolean" ) 
            return next()
    else
        res.status(400).json({error: "is_favorite must be a boolean value"})
}

const checkIndex = async (req, res, next) =>{
    const allSongs = await getAllSongs()
    const {id} = req.params
    const ids = allSongs.map(e => e.id)
    if(ids.includes(Number(id)))
        return next()
    else
    res.status(404).redirect("/error - invalid song id")
}

module.exports = { checkBoolean, checkName, checkArtist, checkTime, checkIndex, checkSongs }

