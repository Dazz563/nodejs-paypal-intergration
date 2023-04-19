const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	} catch (error) {
		throw new Error('Hashing failed', error);
	}
};

exports.comparePasswords = async (password, hashedPassword) => {
	try {
		const isMatch = await bcrypt.compare(password, hashedPassword);
		return isMatch;
	} catch (error) {
		throw new Error(`Error comparing passwords: ${error.message}`);
	}
};
