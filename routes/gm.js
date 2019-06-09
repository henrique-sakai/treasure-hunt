const Quest = require('./models/quest');
const Adventure = require('./models/adventure');

module.exports = {
	//carrega página do adm
	getGmPage: (req, res) => {
		console.log("GM Page\n");

		Adventure.find().then(
			(adv_result) => {

			    var adventures = adv_result;

			    Quest.find().then(
			    	(quest_result) => {

			    	    var quests = quest_result;
			    	    console.log(quests);
			    	    res.status(200).render('gm/gmPage.ejs', {
			    	    	adventures,
			    	    	quests
			    	    });
			    	}
			    	).catch(
			    		(error) => {
			    			res.status(400).json({error: error});
			    		}
			    	);
			}
			).catch(
				(error) => {
					res.status(400).json({error: error});
				}
			);
	},
	getQuestPage: (req, res) => {
		console.log("Página de info de uma quest");

		quest_id = req.params.id;
		
		Quest.find({_id: quest_id}).then(
	    	(quest_result) => {

	    	    var quest = quest_result[0];

	    	    console.log(quest)
	    	    
	    	    res.status(200).render('gm/quest.ejs', {
	    	    	quest
	    	    });
	    	}
	    	).catch(
	    		(error) => {
	    			res.status(400).json({error: error});
	    		}
	    	);
	},
	getNewAdventurePage: (req, res) => {
		console.log("Page to create an adventure\n");

		res.render('gm/newAdventure.ejs');
	},
	createAdventure: (req, res) => {
		console.log("Create adventure\n");

		const adventure = new Adventure({
			name: req.body.name,
			start_time: req.body.start,
			end_time: req.body.end
		})

		adventure.save().then(
			() => {
				res.status(201).redirect('/gm');
			}
			).catch(
				(error) => {
					res.status(400).json({error: error});
				}
			);
	},
	//carrega página de criação de nova quest
	getNewQuestPage: (req, res) => {
		console.log("Page to create a quest\n");

		res.render('gm/newQuest.ejs');
	},
	//insere no bd as informações da quest
	createQuest: (req, res) => {
		console.log("Create quest\n");

		const quest = new Quest({
			name: req.body.name,
			adventure_id: req.params.id,
			clue: req.body.clueText,
			answer: req.body.answer,
			area: req.body.area
		})

		console.log(quest);

		quest.save().then(
			() => {
				res.status(201).redirect('/gm');
			}
			).catch(
				(error) => {
					res.status(400).json({error: error});
				}
			);

		/*let select_command = "SELECT total_quests FROM adventure WHERE adventure_id=?;";
		db.query(select_command, [id], (err, total) => {
			if(err) return res.status(500).send(err);

			total = total[0].total_quests + 1;

			let update_command = "UPDATE adventure SET total_quests=? WHERE adventure_id=?;";
			db.query(update_command, [total, id], (err, updateResult) => {
				if(err) return res.status(500).send(err);

				let insert_command = "INSERT INTO quest(adventure_id, sequence, name, north, south, east, west, clue_text, answer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, '');";
				values = [id, total, name, north, south, east, west, text];
				db.query(insert_command, values, (err, insertResult) => {
					if(err) return res.status(500).send(err);

					res.redirect('/gm');
				});

			});
		});*/
	}
}