import config from '../../config/config';

import passport from './passport';
import log from './utils/log';

import banRouter from './routes/ban';
import apiRouter from './routes/api';
import authRouter from './routes/auth';

import * as http from 'http';

import express from 'express';
import session from 'express-session';

import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

import helmet from 'helmet';

// Error logging.
process.on(`uncaughtException`, err => log(`red`, err.stack));

// Express app.
const app: express.Application = express();

// Express extension configurations.
app.use(express.json({ limit: `5mb` }));
app.use(express.urlencoded({ limit: `5mb`, extended: true }));

// Database connection.
mongoose.connect(process.env.MONGO_URI).then(() => log(`green`, `User authentication has connected to database.`));

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
const server = http.createServer(app);

// Bind the webfront to defined port.
server.listen(config.port, () => log(`green`, `Webfront bound to port ${config.port}.`));
