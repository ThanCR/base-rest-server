const { response, request } = require('express');
const interaction = require('../models/Interaction')

const interactionGet = async(req = request, res = response) => {
    res.json({
        msg: 'API is running on GET'
    })
}


module.exports = {
    interactionGet
}