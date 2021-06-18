import config from '../../config/config';

import passport from './passport';
import log from './utils/log';

import banRouter from './routes/ban';
import apiRouter from './routes/api';
import authRouter from './routes/auth';
import indexRouter from './routes/index';

import * as path from 'path';
import * as http from 'http';

import express from 'express';
import session from 'express-session';

import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

import helmet from 'helmet';

const ejsLayouts = require(`express-ejs-layouts`);

// Error logging.
process.on(`uncaughtException`, err => log(`red`, err.stack));

// Express app.
const app: express.Application = express();

// Express extension configurations.
app.use(express.json({ limit: `5mb` }));
app.use(express.urlencoded({ limit: `5mb`, extended: true }));

// Database connection.
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => log(`green`, `User authentication has connected to database.`));

// Express session.
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}));

// Passport middleware.
app.use(passport.initialize());
app.use(passport.session());

// Express middleware.
app.use(ejsLayouts);
app.use(helmet({ contentSecurityPolicy: false }));

// NGINX Proxy.
app.set(`trust proxy`, true);

// Set view engine.
app.set(`views`, path.resolve(__dirname, `views`));
app.set(`view engine`, `ejs`);

// Serve static files.
app.use(`/assets`, express.static(path.resolve(__dirname, `../client/assets`)));
app.use(`/`, express.static(path.resolve(__dirname, `../../media`)));

// First, check if an IP is banned.
app.use(`/`, banRouter);

// Then, pass to the other routers.
app.use(`/auth`, authRouter);
app.use(`/api`, apiRouter);
app.use(`/`, indexRouter);

// Create the webfront.
const server = http.createServer(app);

// Bind the webfront to defined port.
server.listen(config.port, () => log(`green`, `Webfront bound to port ${config.port}.`));
