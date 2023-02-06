const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

const { submitNames, randEvent, getP2Name, getP1Name} = require('./controller')

app.post('/api/submitNames', submitNames)
app.get('/api/randEvent', randEvent)
app.get('/api/getP2Name', getP2Name)
app.get('/api/getP1NAme', getP1Name)


app.listen(4321, () => console.log('Up on port 4321'))