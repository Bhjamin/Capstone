const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

const { submitNames, randEvent} = require('./controller')

app.post('/api/submitNames', submitNames)
app.get('/api/randEvent', randEvent)



app.listen(4321, () => console.log('Up on port 4321'))