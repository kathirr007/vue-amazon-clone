const router = require('express').Router()
const moment = require('moment')

const SHIPMENT = {
    normal: {
        price: 13.98,
        days: 7
    },
    fast: {
        price: 49.98,
        days: 3
    },
}

function shipmentPrice(shipmentOption) {
    let estimated = moment().add(shipmentOption.days, 'd').format('dddd MMM Do')

    return {
        estimated,
        price: shipmentOption.price
    }
}

// POST request - for shipment setting
router.post('/shipment', (req, res) => {
    let shipment
    if(req.body.shipment === 'normal') {
        shipment = shipmentPrice(SHIPMENT.normal)
    } else {
        shipment = shipmentPrice(SHIPMENT.fast)
    }

    res.json({
        success: true,
        shipment: shipment
    })
})

// GET request - get categories
router.get('/categories', async(req,res) => {
    try {
        let categories = await Category.find()
        res.json({
            success: true,
            categories: categories
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// GET request - get a single product

// PUT request - Update a single product

// DELETE request - delete a single product

module.exports = router