module.exports = {
	getGmPage: (req, res) => {		
		console.log("GM Page");
		res.render('gmPage.ejs');
	},
	createQuest: (req, res) => {
		console.log("create quest");
		console.log(req.body);
		name = req.body.name;
		north = req.body.north;
		south = req.body.south;
		east = req.body.east;
		west = req.body.west;
		text = req.body.clueText;

		let insert_command = "INSERT INTO quest(name, north, south, east, west, clue_text) VALUES (?, ?, ?, ?, ?, ?);";
		values = [name, north, south, east, west, text];
		db.query(insert_command, values, (err, insertResult) => {
			if(err) return res.status(500).send(err);

			res.render('gmPage.ejs');
		});
	}
}