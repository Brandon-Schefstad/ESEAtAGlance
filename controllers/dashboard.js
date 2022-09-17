module.exports = {
	getDashboard: (req, res) => {
		const user = req.user;
		// console.log(req.user);
		res.render('dashboard');
	},
};
