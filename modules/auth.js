const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
module.exports = {
	createJWT: (user) => {
		const token = jwt.sign(
			{ id: user.id, username: user.username },
			process.env.JWT_SECRET
		)
		return token
	},

	comparePasswords: (password, hash) => {
		return bcrypt.compare(password, hash)
	},

	hashPassword: (password) => {
		return bcrypt.hash(password, 5)
	},

	matchUserId: async (userId, todoId, res) => {
		const todo = await prisma.todo.findFirst({
			where: {
				id: parseInt(todoId),
			},
		})
		if (!todo) {
			res.json({ error: 'No todo matching that ID', status: 404 })
		}
		return todo.id === userId ? true : false
	},
}
