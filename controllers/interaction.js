const Interaction = require('../models/interaction')
const interactionData = require('../data/interactions-data.json')
const { uid } = require('uid')
const fs = require('node:fs')

const interactionGetAll = async (req, res) => {
    try {
        res.status(200).json(interactionData)
    } catch (error) {
        console.log(error)
    }
}

const interactionGet = async (req, res) => {
    const id = req.params.id
    try {
        var result = {}
        interactionData.forEach(interaction => {
            if (interaction.Id == id) {
                result = {
                    id,
                    type: interaction.type,
                    date: interaction.date
                }
            }
        });
        if (result.id != undefined)
            res.status(200).json({
                status: 200,
                result
            })
        else {
            res.status(200).json({
                status: 200,
                msg: 'OK - No results were found!!'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'ERROR - An error has occurred when tried to execute the operation'
        })
    }

}

const interactionPost = async (req, res) => {
    try {
        const { type, date } = req.body
        if (type != undefined || type != "" || date != undefined || date != "") {
            const newInteraction = new Interaction(uid(), type, date)
            interactionData.push(newInteraction)
            await fs.writeFile('./data/interactions-data.json', JSON.stringify(interactionData), err => {
                !err ? '' : console.log(err)
            })
            res.status(200).json({
                status: 200,
                msg: "OK - Interaction registered!",
                newInteraction
            })
        }
    }
    catch (e) {
        res.status(500).json({
            msg: "An error has occurred!!",
            errorMessage: `${e}`
        })
        console.log(e);
    }
}

module.exports = {
    interactionGetAll,
    interactionGet,
    interactionPost
}