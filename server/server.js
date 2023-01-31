const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())






app.listen(4321, () => console.log('Up on port 4321'))