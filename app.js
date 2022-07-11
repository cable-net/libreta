const express = require('express')
const app = express()
require('dotenv').config()

const healthRoutes = require('./routes/health')

app.use('/api/health/', healthRoutes)

console.log('asdas')

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on: ${PORT}`)
})
