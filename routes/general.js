module.exports = {
	getHomePage: (req, res) => {		
		console.log("Home Page");
		res.render('tests.ejs');
	}
}