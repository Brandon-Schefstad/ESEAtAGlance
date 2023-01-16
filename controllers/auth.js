const passport = require('passport')
const validator = require('validator')
//
const Teacher = require('../models/Teacher')
const { comparePasswords, createJWT, hashPassword } = require('../modules/auth')

exports.postLogin = async (req, res, next) => {
	// console.log(req.body)
	// const validationErrors = []
	// if (!validator.isEmail(req.body.email))
	// 	validationErrors.push({ msg: 'Please enter a valid email address.' })
	// if (validator.isEmpty(req.body.password))
	// 	validationErrors.push({ msg: 'Password cannot be blank.' })

	// if (validationErrors.length) {
	// 	req.flash('errors', validationErrors)
	// 	return res.redirect('/')
	// }
	// req.body.email = validator.normalizeEmail(req.body.email, {
	// 	gmail_remove_dots: false,
	// })
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
	// const validationErrors = []
	// if (!validator.isEmail(req.body.email))
	// 	validationErrors.push({ msg: 'Please enter a valid email address.' })
	// if (!validator.isLength(req.body.password, { min: 8 }))
	// 	validationErrors.push({
	// 		msg: 'Password must be at least 8 characters long',
	// 	})
	// if (req.body.password !== req.body.confirmPassword)
	// 	validationErrors.push({ msg: 'Passwords do not match' })

	// if (validationErrors.length) {
	// 	req.flash('errors', validationErrors)
	// 	return res.redirect('../signup')
	// }
	// req.body.email = validator.normalizeEmail(req.body.email, {
	// 	gmail_remove_dots: false,
	// })
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
