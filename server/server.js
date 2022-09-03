const IN_PROD = process.env.NODE_ENV === 'production';
if (!IN_PROD) {
    // eslint-disable-next-line global-require,  import/no-extraneous-dependencies
    const dotenv = require('dotenv');
    dotenv.config();
}

// env
const { DATABASE_URL, SESSION_SECRET } = process.env;
const PORT = process.env.PORT || 5000;
const ORIGIN = IN_PROD ? 'https://tower-of-hanoi-kevin.herokuapp.com/' : 'http://localhost:3000/';

// imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const passportConfig = require('./config/passport');
const dbConfig = require('./config/database');
// routers
const levelRouter = require('./routes/level');
const userRouter = require('./routes/user');

// configure passport and database
passportConfig(passport);
dbConfig(mongoose, DATABASE_URL);

// session
const sessionStore = MongoStore.create({
    client: mongoose.connection.getClient(),
    collectionName: 'sessions'
});

const app = express();
// middleware
app.use(cors({ credentials: true, origin: ORIGIN }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        proxy: true, // heroku required, reference: https://stackoverflow.com/questions/14463972/how-to-set-secure-cookie-using-heroku-node-js-express
        rolling: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // maxAge = 1 day (1day * 24hr/1day * 60 min/1hr * 60sec/1min * 1000ms/1sec)
            secure: IN_PROD
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/level', levelRouter);
app.use('/api/user', userRouter);

if (IN_PROD) {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}
app.listen(PORT);
