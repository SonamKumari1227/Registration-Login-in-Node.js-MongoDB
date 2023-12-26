var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
	
    user_id: Number,
    email: String,
    username: String,
    password: String,
    passwordConf: String
});
const User = mongoose.model('User', userSchema);

module.exports = User;