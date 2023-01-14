module.exports = {
	ensureAuth: function (req, res, next) {
		if (req.isAuthenticated()) {
			console.log('authorized')
			return next()
		} else {
			console.log('unauthorized')
			res.redirect('/')
		}
	},
}
