import Express from 'express';
import MongoStore from 'connect-mongo';

import * as Mongoose from 'mongoose';
import * as HTTP from 'http';

import session from 'express-session';
import helmet from 'helmet';

import config from '../config/config';

import log from './utils/log';
import { logHeader, logSplash } from './utils/logExtra';
import createMediaFolders from './utils/createMediaFolders';

import banRouter from './routes/ban';
import apiRouter from './routes/api';
import authRouter from './routes/auth';

import passport from './passport';

// Error logging.
process.on(`uncaughtException`, err => log(`red`, err.stack));

// Express app.
const app: Express.Application = Express();

// Express extension configurations.
app.use(Express.json({ limit: `5mb` }));
app.use(Express.urlencoded({ limit: `5mb`, extended: true }));

// Database connection.
Mongoose.connect(process.env.MONGO_URI).then(() => log(`green`, `User authentication has connected to database.`));

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
app.use(helmet({ contentSecurityPolicy: false }));

// First, check if an IP is banned.
app.use(`/`, banRouter);

// Then, pass to the other routers.
app.use(`/auth`, authRouter);
app.use(`/api`, apiRouter);

// Create the webfront.
const server = HTTP.createServer(app);

// Bind the webfront to defined port.
server.listen(config.port, () => {
    logSplash();
    logHeader();

    log(`green`, `Webfront bound to port ${config.port}.`);
    logHeader();

    createMediaFolders();
    logHeader();
});
