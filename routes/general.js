const Player = require('./models/players');
const Quest = require('./models/quest');
const Adventure = require('./models/adventure');

module.exports = {
	getHomePage: (req, res) => {
		console.log("Home Page\n");

		res.render('player/login.ejs');
	},
	getInitialPage: (req, res) => {
		console.log('Players initial page');

		Adventure.find().then(
			(adv_result) => {

			    var adventures = adv_result;

			    Quest.find().then(
			    	(quest_result) => {

			    	    var quests = quest_result;

			    	    console.log(quests)
			    	    
			    	    res.status(200).render('player/initial.ejs', {
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
	getLoginPage: (req, res) => {
		console.log('Login page');

		res.status(200).render('player/login.ejs');
	},
	loginPlayer: (req, res) => {
		//sess = req.session;
		console.log("try login");

		Player.find({ email: req.body.email, password: req.body.password}).then(
		    (player) => {
		    	if(player.length == 0) {
		    		console.log("invalid login");

		    		res.status(401).render('player/login.ejs', {
		    		    message: "Invalid Login"
		    		});
		    	}
		    	if(player.length > 0) {
		    		console.log("successful login");
		    		//sess.status = 'logged';
		    		res.status(200).redirect('/');
		      	}
		    }
		  	).catch(
		    	(error) => {
		      		res.status(400).json({
		        		error: error
		      		});
		    	}
		  	);
	},
	getPlayaQuestPage: (req, res) => {		
		console.log("Quest Page for players\n");

		//advId = req.params.advId
		//qstId = req.params.qstId;
		
		Quest.find({_id: req.params.qstId}).then(
	    	(quest_result) => {

	    	    var quest = quest_result[0];

	    	    console.log(quest)
	    	    
	    	    res.status(200).render('player/playingQuest.ejs', {
	    	    	quest
	    	    });
	    	}
	    	).catch(
	    		(error) => {
	    			res.status(400).json({error: error});
	    		}
	    	);
/*
		let select_command = "SELECT * FROM quest WHERE quest_id=?";
		db.query(select_command, [qstId], (err, quest) => {
			if(err) return res.status(500).send(err);

			res.render('player/playingQuest.ejs', {
				quest: quest[0]
			});
		});*/
		
	}
}