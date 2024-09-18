const { findUser } = require("../repositories/userRepositories");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRATE, JWT_EXPIRY } = require("../config/serverConfig");


async function loginUser(authDetails) {
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    // 1. Check the user is register or not with the given email or password 

    const user = await findUser({ email })

    if (!user) {
        throw { message: 'No user found with the given email', statusCode: 404 }
    }

    // 2. If the user find we need to compare plainPassword to hashed password
    const isPasswordValidated = await bcrypt.compare(plainPassword, user.password);

    // 3. If password not validate
    if (!isPasswordValidated) {
        throw { message: 'Invalid password, please try again ', statusCode: 401 }
    }

    // 4. If password is validate, create the token and return it
    const token = jwt.sign(
        { email: user.email, id: user._id },
        JWT_SECRATE,
        { expiresIn: JWT_EXPIRY }
    );

    return token;
}

module.exports={
    loginUser
}