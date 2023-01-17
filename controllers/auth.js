const passport = require('passport')
const validator = require('validator')
//
const Teacher = require('../models/Teacher')
const { comparePasswords, createJWT, hashPassword } = require('../modules/auth')

exports.postLogin = async (req, res, next) => {
	const user = await Teacher.findOne({ email: req.body.email })
	const isValid = await comparePasswords(req.body.password, user.password)
	if (!isValid) {
		res.status(401).send('Invalid username or password')
		return
	}
	const token = createJWT(user)
	res.json({
		token: token,
		user: user,
	})
}

exports.postSignup = async (req, res, next) => {
	const hash = await hashPassword(req.body.password)
	const user = new Teacher({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: hash,
	})
	const token = createJWT(user)
	const { _id, firstName, email } = user
	Teacher.findOne(
		{ email: req.body.email },

		(err, existingUser) => {
			if (err) {
				return next(err)
			}
			if (existingUser) {
				return res.send({ user: { _id, firstName, email }, token: token })
			}
			user.save((err) => {
				if (err) {
					return next(err)
				}
				req.logIn(user, (err) => {
					const { _id, firstName, email } = user
					if (err) {
						return next(err)
					}
					res.send({ user: { _id, firstName, email }, token: token })
				})
			})
		}
	)
}
