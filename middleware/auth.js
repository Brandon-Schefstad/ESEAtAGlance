const jwt = require('jsonwebtoken')
module.exports = {
	ensureAuth: async (req, res, next) => {
		const bearer = req.headers.authorization

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

			next()
			return
		} catch (e) {
			console.error(e)
			res.status(401)
			res.send('JWT Invalid')
			return
		}
	},
}
