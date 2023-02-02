
let p1Name = ''
let p2Name = ''


let randomEvents = ['G3', 'G1', 'S50', 'S2', 'L50', 'L1']





module.exports = {

    submitNames: (req, res) => {

        p1Name = req.body.name1
        p2Name = req.body.name2

        res.status(200).send({name1: p1Name, name2: p2Name})
    },

    randEvent: (req, res) => {

        let event = randomEvents[Math.floor(Math.random() * 6)]

        res.status(200).send(event)

    },

    
}