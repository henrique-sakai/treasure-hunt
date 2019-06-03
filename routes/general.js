module.exports = {
	getHomePage: (req, res) => {
		console.log("Home Page\n");

		let select_command = "SELECT * FROM adventure ORDER BY adventure_id DESC;";
		db.query(select_command, (err, adventures) => {
			if(err) return res.status(500).send(err);

			let select_command = "SELECT quest_id, adventure_id, sequence, name FROM quest ORDER BY sequence;";
			db.query(select_command, (err, quests) => {
				if(err) return res.status(500).send(err);

				res.render('player/homePage.ejs', {
					adventures,
					quests
				});
			});
		});
	},
	getPlayaQuestPage: (req, res) => {		
		console.log("Quest Page for players\n");

		advId = req.params.advId
		qstId = req.params.qstId;

		let select_command = "SELECT * FROM quest WHERE quest_id=?";
		db.query(select_command, [qstId], (err, quest) => {
			if(err) return res.status(500).send(err);

			res.render('player/playingQuest.ejs', {
				quest: quest[0]
			});
		});
		
	}
}