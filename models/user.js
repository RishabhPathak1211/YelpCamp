const mongooose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongooose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongooose.model('User', UserSchema);