const { findUser, createUser } = require("../repositories/userRepositories");

    async function registerUser(userDetails) {
        // It will create a brand new user in database

        // 1. we need to check if the user with this email and mobile number alredy exist or not
        const user = await findUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber
        });


        if (user) {
            // we found the user
            throw {
                reason: `User with the given ${userDetails.email} and ${userDetails.mobileNumber} already exist`, statusCode: 400
            }
        };
        // 2. If user not found then create the new user in the daabase
        const newUser = await createUser({
            email: userDetails.email,
            password: userDetails.password,
            mobileNumber: userDetails.mobileNumber,
            lastName: userDetails.lastName,
            firstName: userDetails.firstName
        });

        if (!newUser) {
            throw { reason: 'Something went wrong, can not create user', statusCode: 500 }
        }

        // 3. return the details of created user
        return newUser;
    }



module.exports = {
    registerUser
}