const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is rqeuired'],
        minlength: [5, 'First name must be atlest 5 length'],
        lowercase: true,
        trim: true, // if the user give extra spacing it will automatic trim it
        maxlength: [20, 'First name should be less then or equal 20 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is rqeuired'],
        minlength: [5, 'Last name must be atlest 5 length'],
        lowercase: true,
        trim: true, // if the user give extra spacing it will automatic trim it
        maxlength: [20, 'Last name should be less then or equal 20 characters']
    },
    mobileNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        maxlength: [10, 'Phone number should be 10 characters'],
        minlength: [10, 'Phone number should be 10 characters'],
        trim: true,
        unique: [true, `${this.mobileNumber} already exist`]
    },
    email: {
        type: String,
        trime: true,
        required: [true, 'Email should be provided'],
        unique: [true, `${this.email} already exist`],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password should be provided'],
        minlength: [6, `Password atleast 6 characters long`]
    }

}, {
    timestamps: true
});

userSchema.pre('save', async function () {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
})

const User = mongoose.model('User', userSchema); // colection

module.exports = User;