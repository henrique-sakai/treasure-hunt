module.exports = {
	getGmPage: (req, res) => {		
		console.log("GM Page");
		res.render('gmPage.ejs');
	},
	createQuest: (req, res) => {
		console.log("create quest");
		res.render('gmPage.ejs');
	}
}