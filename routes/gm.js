module.exports = {
	//carrega página do adm
	getGmPage: (req, res) => {
		console.log("GM Page\n");

		let select_command = "SELECT * FROM adventure ORDER BY adventure_id DESC;";
		db.query(select_command, (err, adventures) => {
			if(err) return res.status(500).send(err);

			let select_command = "SELECT * FROM quest ORDER BY sequence;";
			db.query(select_command, (err, quests) => {
				if(err) return res.status(500).send(err);

				res.render('gm/gmPage.ejs', {
					adventures,
					quests
				});
			});
		});
	},
	getQuestPage: (req, res) => {
		console.log("Página de info de uma quest");

		quest_id = req.params.id;
	
		let select_command = "SELECT * FROM quest WHERE quest_id=?;";
		db.query(select_command, [quest_id], (err, quest) => {
			if(err) return res.status(500).send(err);

			res.render('gm/quest.ejs', {
				quest: quest[0]
			});

		});
	},
	getNewAdventurePage: (req, res) => {
		console.log("Page to create an adventure\n");

		res.render('gm/newAdventure.ejs');
	},
	createAdventure: (req, res) => {
		console.log("Create adventure\n");

		var name = req.body.name;

		let insert_command = "INSERT INTO adventure(name, total_quests) VALUES (?, ?);";
		db.query(insert_command, [name, 0], (err, insertResult) =>{
			if(err) res.status(500).send(err);

			res.redirect('/gm');
		});
	},
	//carrega página de criação de nova quest
	getNewQuestPage: (req, res) => {
		console.log("Page to create a quest\n");

		res.render('gm/newQuest.ejs');
	},
	//insere no bd as informações da quest
	createQuest: (req, res) => {
		console.log("Create quest\n");

		id = req.params.id;

		name = req.body.name;
		north = req.body.north;
		south = req.body.south;
		east = req.body.east;
		west = req.body.west;
		text = req.body.clueText;

		let select_command = "SELECT total_quests FROM adventure WHERE adventure_id=?;";
		db.query(select_command, [id], (err, total) => {
			if(err) return res.status(500).send(err);

			total = total[0].total_quests + 1;

			let update_command = "UPDATE adventure SET total_quests=? WHERE adventure_id=?;";
			db.query(update_command, [total, id], (err, updateResult) => {
				if(err) return res.status(500).send(err);

				let insert_command = "INSERT INTO quest(adventure_id, sequence, name, north, south, east, west, clue_text) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
				values = [id, total, name, north, south, east, west, text];
				db.query(insert_command, values, (err, insertResult) => {
					if(err) return res.status(500).send(err);

					res.redirect('/gm');
				});

			});
		});
	}
}