const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const User = db.users;
const {comparePasswords} = require('../utils/helpers');

passport.serializeUser((user, done) => {
	console.log('Serializing user');
	console.log(user);
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		console.log('Deserializing user');
		console.log('id', id);
		const user = await User.findOne({where: {id}});
		done(null, user);
	} catch (err) {
		done(err);
	}
});

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, done) => {
			console.log('email', email);
			console.log('password', password);

			try {
				if (!email || !password) return done(null, false, {message: 'All fields are required'});

				const user = await User.findOne({where: {email}});
				if (!user) return done(null, false, {message: 'Invalid Credentials'});

				const isMatch = await comparePasswords(password, user.password);

				if (isMatch) {
					return done(null, user, {message: 'Logged in Successfully'});
				} else {
					return done(null, false, {message: 'Incorrect Credentials'});
				}
			} catch (err) {
				done(err, false, {message: 'An error occurred while logging in the user.'});
			}
		}
	)
);
