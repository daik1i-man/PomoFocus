const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const PORT = process.env.PORT || 5000
const passport = require('passport');
const tasks = require("./Routers/taskRouter.js")
const userAuth = require("./Routers/userAuthRouter.js")
const setting = require("./Routers/settings.js")
const db = require("./Modules/dataBase.js")
const app = express()

require("./auth")

app.use(bodyParser.json())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
    optionSuccessStatus: 200
}))

app.use(cookieParser())
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/user", tasks)
app.use("/auth", userAuth)
app.use("/settings", setting)

app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    console.log('Cookies:', req.cookies);
    next();
});

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }
));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
    })
);


app.get('/protected', async (req, res) => {
    try {
        const user = await db.query("SELECT * FROM users WHERE email =$1", [req.user.email])
        res.json({user:user.rows[0]})
    } catch (error) {
        console.log(error);
    }
});

app.get("/get/userInfo", async (req, res) => {
    
})

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

