module.exports = {
	getDashboard: (req, res) => {
		console.log(req);
		res.render('dashboard');
	},
};
