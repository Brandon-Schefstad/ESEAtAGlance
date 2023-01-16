module.exports = {
<<<<<<< HEAD
	ensureAuth: async (req, res, next) => {
		const bearer = req.headers.authorization
		console.log(bearer)
		if (!bearer) {
			res.status(401)
			res.send('No Credentials')
			return
		}

		const token = bearer

		if (!token) {
			res.status(401)
			res.send('No Token')
			return
		}

		try {
			const payload = jwt.verify(token, process.env.JWT_SECRET)
			req.user = payload
			//
			console.log(payload)
			next()
			return
		} catch (e) {
			console.error(e)
			res.status(401)
			res.send('JWT Invalid')
			return
=======
	ensureAuth: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		} else {
			res.redirect('/')
>>>>>>> 1e7cca56fa495c0ac69cb6f0c8e2bf580f873b3b
		}
	},
}
