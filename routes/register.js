const Player = require('./models/players');

module.exports = {
	getRegisterPage: (req, res) => {
		res.render('player/register.ejs');
	},
	registerPlayer: (req, res) => {

		const player = new Player({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		})

		player.save().then(
		  	() => {
		    	res.status(201).redirect('/');
		  	}
			).catch(
			  	(error) => {
			  		res.status(400).json({error: error});
				}
			);

	}

}