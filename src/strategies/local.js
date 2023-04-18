const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const User = db.users;
const {comparePasswords} = require('../utils/helpers');

passport.serializeUser((user, done) => {
	// console.log('Serializing user');
	// console.log('user', user.toJSON());
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	// console.log('Deserializing user');
	// console.log('id', id);
	try {
		const user = await User.findOne({where: {id}});
		if (!user) throw new Error('User not found');
		done(null, user);
	} catch (err) {
		console.log(err);
		done(err);
	}
});

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, done) => {
			try {
				if (!email || !password) {
					// console.log('All fields are required');
					return done(null, false, {message: 'All fields are required'});
				}

				const user = await User.findOne({where: {email}});
				if (!user) {
					// console.log('Invalid Credentials');
					return done(null, false, {message: 'Invalid Credentials'});
				}

				const isMatch = await comparePasswords(password, user.password);

				if (isMatch) {
					// console.log('Logged in Successfully');
					return done(null, user, {message: 'Logged in Successfully'});
				} else {
					// console.log('Incorrect Credentials');
					return done(null, false, {message: 'Incorrect Credentials'});
				}
			} catch (err) {
				done(err, false, {message: 'An error occurred while logging in the user.'});
			}
		}
	)
);
