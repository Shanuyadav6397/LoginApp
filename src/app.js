const express = require('express');
const cookieParser = require('cookie-parser')
const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoue');
const authRouter = require('./routes/authroute');
const { isLoggedIn } = require('./validation/authValidator');
//const User = require('./schema/userSchema');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
// here we will setup a middle ware for collecting all request from routing layer
app.use('/users', userRouter); // conetcs the router to the server
app.use('/users', cartRouter);
app.use('/auth', authRouter);

app.get('/ping', isLoggedIn, (req, res) => {
    //contraler
    console.log(req.body);
    console.log(req.cookies)
    return res.json({ message: "pong" });
})

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}...!!`);

    // const newUser = await User.create({
    //     email: 'a@b.com',
    //     firstName: 'Shanu',
    //     lastName: 'Yadav',
    //     password: '1234567',
    //     mobileNumber: '1234567890'
    // });
    // console.log("Ceated new user");
    // console.log(newUser);
});