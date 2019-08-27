const mongoose = require('mongoose');

let validRoles = {
    values: ['ADMIN', 'EMPLOYEE', 'CLIENT'],
    message: '{VALUE} is not a valid role'
}

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Usarname is required ']
    },
    password: {
        type: String,
        required: [true, 'Password is required ']
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'CLIENT',
        enum: validRoles
    },
    active: {
        type: Boolean,
        default: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

module.exports = mongoose.model('user', userSchema, 'user');