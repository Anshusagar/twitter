const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is Required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Enter your Password'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your pasword'],
        validate: {
            validator: function (ele) {
                return ele === this.password
            },
            message: "Passwords are not Same!"
        }
    },
    isLoggedIn: {
        type: Boolean,
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();


    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();



})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema);

module.exports = User;