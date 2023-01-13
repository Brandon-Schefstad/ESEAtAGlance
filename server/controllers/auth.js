const passport = require('passport')
const validator = require('validator')
//
const Teacher = require('../models/Teacher')

exports.getLogin = (req, res) => {
	if (req.user) {
		return res.redirect('/dashboard')
	}
	res.redirect('/')
}

exports.postLogin = (req, res, next) => {
	console.log(req.body)
	const validationErrors = []
	if (!validator.isEmail(req.body.email))
		validationErrors.push({ msg: 'Please enter a valid email address.' })
	if (validator.isEmpty(req.body.password))
		validationErrors.push({ msg: 'Password cannot be blank.' })

	if (validationErrors.length) {
		req.flash('errors', validationErrors)
		return res.redirect('/')
	}
	req.body.email = validator.normalizeEmail(req.body.email, {
		gmail_remove_dots: false,
	})

	passport.authenticate('local', (err, user, info) => {
		console.log('loggin in!')
		console.log(req.body)
		if (err) {
			return next(err)
		}
		if (!user) {
			req.flash('errors', info)
			return res.redirect('/')
		}

		req.logIn(user, async (err) => {
			if (err) {
				return next(err)
			}

			const { _id, firstName, email } = await user
			req.flash('success', { msg: 'Success! You are logged in.' })
			res.send({ user: { _id, firstName, email } })
		})
	})(req, res, next)
}

exports.logout = (req, res) => {
	req.session.destroy((err) => {
		req.user = null
		res.redirect('/')
	})
}

exports.getSignup = (req, res) => {
	if (req.user) {
		return res.redirect('/dashboard')
	}
}

exports.postSignup = (req, res, next) => {
	const validationErrors = []
	if (!validator.isEmail(req.body.email))
		validationErrors.push({ msg: 'Please enter a valid email address.' })
	if (!validator.isLength(req.body.password, { min: 8 }))
		validationErrors.push({
			msg: 'Password must be at least 8 characters long',
		})
	if (req.body.password !== req.body.confirmPassword)
		validationErrors.push({ msg: 'Passwords do not match' })

	if (validationErrors.length) {
		req.flash('errors', validationErrors)
		return res.redirect('../signup')
	}
	req.body.email = validator.normalizeEmail(req.body.email, {
		gmail_remove_dots: false,
	})

	const user = new Teacher({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
	})

	Teacher.findOne(
		{ email: req.body.email },

		(err, existingUser) => {
			if (err) {
				return next(err)
			}
			if (existingUser) {
				const { _id, firstName, email } = user
				req.flash('errors', {
					msg: 'Account with that email address or username already exists.',
				})
				return res.send({ user: { _id, firstName, email } })
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
					res.send({ user: { _id, firstName, email } })
				})
			})
		}
	)
}
