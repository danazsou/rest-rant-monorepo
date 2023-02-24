// Modules and Globals
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
//const cookieSessions=(require)('cookie-session')
const defineCurrentUser = require('./middleware/defineCurrentUser')

// Express Settings

app.use(cookieSession({
    name: 'session',
    keys: [ process.env.SESSION_SECRET ],
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(defineCurrentUser)

// Controllers & Routes

app.use(express.urlencoded({ extended: true }))

app.use('/places', require('./controllers/places'))
app.use('/users', require('./controllers/users'))

// Listen for Connections
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})