const express = require('express')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
require('dotenv').config({ path: './config/.env' })
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
	origin: true,
	optionSuccessStatus: 200,
}
/**Passport */
async function connect() {
	connectDB().then(
		app.listen(process.env.PORT || 2121, () => {
			console.log(`http://localhost:${process.env.PORT}`)
		})
	)
}

/**Connect To DB*/
connect()

/**Express configs */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
app.use(flash())

app.use(cors(options))
app.use('/api/student', studentRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api', mainRoutes)
app.use('/', (req, res) => {
	res.json({ hello: 'World!' })
})
