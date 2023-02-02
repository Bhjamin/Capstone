
let p1Name = ''
let p2Name = ''

let p1Cards = []
let p2Cards = []

let p1Properties = []
let p2Properties = []





module.exports = {

    submitNames: (req, res) => {

        p1Name = req.body.name1
        p2Name = req.body.name2

        res.status(200).send({name1: p1Name, name2: p2Name})
    }
    
}