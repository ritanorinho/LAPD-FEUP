"use strict";

const service = require('../services/tm_discovery/getEvents');


function getSuggestions(req, res) {
}

async function getDetails(req, res) {
    const {eventId} = req.params
    const details = await service.getEvent({ eventId });
    res.json({ details })
 }

module.exports = {
    getSuggestions,
    getDetails
};
