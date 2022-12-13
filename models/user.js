const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true }
	},
	{ collection: 'users' }
)

UserSchema.plugin(passportLocalMongoose);

//mongoose.model('User', UserSchema);
//module.exports = mongoose.model('User');
const model = mongoose.model('UserSchema', UserSchema)

module.exports = model
