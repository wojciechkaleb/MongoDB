const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://wojtaaz:gitgit1@ds247290.mlab.com:47290/mynodeappdatabase');

const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

userSchema.methods.manify = function (next) {
    this.name = this.name + '-boy';

    return next(null, this.name);
};

userSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});
const User = mongoose.model('User', userSchema);
const kenny = new User({
    name: 'Kenny',
    username: 'Kenny_the_boy',
    password: 'password'
});
kenny.manify(function (err, name) {
    if (err) throw err;
    console.log('Your new name: ' + name);
});
const mark = new User({
    name: 'Mark',
    username: 'Mark_the_boy',
    password: 'password'
});
mark.manify(function (err, name) {
    if (err) throw err;
    console.log('Your new name: ' + name);
});
const benny = new User({
    name: 'Benny',
    username: 'Benny_the_boy',
    password: 'password'
});
benny.manify(function (err, name) {
    if (err) throw err;
    console.log('Your new name: ' + name);
});
const findAllUsers = () =>
    User.find({}).exec()
        .then(records => {
            console.log('\n Actual database recrods are \n' + records);
        })
        .catch(error => {
            console.log('Something went wrong ' + error);
        });
const findSpecificUser = (username) =>
    User.findOne({ username }).exec()
        .then(record => {
            console.log('\n Record you are looking for is \n' + record)
        })
        .catch(error => {
            console.log('Something went wrong ' + error);
        });
const updateUserPasword = (username, newPassword) =>
    User.findOneAndUpdate({ username }, { $set: { password: newPassword } }).exec()
        .then(user => {
            console.log('User ' + user.name + ' password has been changed to ' + newPassword);
        })
        .catch(error => {
            console.log('Something went wrong ' + error);
        })
const updateUsername = (username, newUsername) => {
    User.findOneAndUpdate({ username }, { $set: { username: newUsername } }).exec()
        .then(user => {
            console.log('User ' + user.username + ' username has been changed to ' + newUsername);
        })
        .catch(error => {
            console.log('Something went wrong ' + error);
        })
}
const deleteUser = (username) => {
    User.findOneAndRemove({username}).exec()
    .then(user=>{
        console.log('User ' + user.username + ' has been deleted');
    })
    .catch(err=>{
        console.log('Something went wrong ' + err);
    })
}
Promise.all([kenny.save(),mark.save(),benny.save()])
    .then(findAllUsers)
    .then(findSpecificUser('Kenny_the_boy'))
    .then(updateUserPasword('Kenny_the_boy', 'kennyPassword'))
    .then(updateUsername('Kenny_the_boy','Kenny_cute_boy'))
    .then(deleteUser('Benny_the_boy'))
    .then(findAllUsers)
