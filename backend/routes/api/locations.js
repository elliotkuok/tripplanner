const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const cities = require('../../json-data/cities.json')
const countries = require('../../json-data/countries.json')
const allLocations = [...cities, ...countries]

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

router.get('/', async (req, res) => {
    const {location} = req.query
    try{
        if(location){
            const locations = allLocations.filter(loc => loc.name.startsWith(capitalizeFirstLetter(location)))
            return res.json(locations)
        }
    } catch(err){
        return res.json([]);
    }
})

module.exports = router;