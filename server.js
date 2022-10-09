const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const dashboardRoutes = require('./routes/dashboard.js');
const studentRoutes = require('./routes/student.js');
const teacherRoutes = require('./routes/teacher.js');
const cookieParser = require('cookie-parser');

require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

connectDB();

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());

// Sessions
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			client: mongoose.connection.getClient(),
		}),
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', mainRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/student', studentRoutes);
// app.use('/teacher', teacherRoutes);

app.listen(process.env.PORT || 2121, () => {
	console.log('Server is running, you better catch it!');
});
