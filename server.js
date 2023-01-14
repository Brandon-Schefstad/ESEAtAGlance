const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const cookieParser = require('cookie-parser')
require('dotenv').config({ path: './config/.env' })
const bodyParser = require('body-parser')
const cors = require('cors')
const mainRoutes = require('./routes/main')
const dashboardRoutes = require('./routes/dashboard.js')
const studentRoutes = require('./routes/mainstudent.js')

/**Session configs */
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI,
		}),
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
)
const options = {
	origin: 'https://ese-at-a-glance-xej4.vercel.app/',
	optionSuccessStatus: 200,
}
/**Passport */
require('./config/passport')(passport)
async function connect() {
	connectDB().then(
		app.listen(process.env.PORT || 2121, () => {
			console.log(`http://localhost:${process.env.PORT}`)
		})
	)
}

/**Passport Middleware*/
app.use(passport.initialize())
app.use(passport.session())

/**Connect To DB*/
connect()

/**Express configs */
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
)
app.use(logger('dev'))
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(flash())
//
app.use(cors(options))
app.use('/api/student', cors(options), studentRoutes)
app.use('/api/dashboard', cors(options), dashboardRoutes)
app.use('/api', cors(options), mainRoutes)
app.use('/', (req, res) => {
	res.json({ hello: 'World' })
})
