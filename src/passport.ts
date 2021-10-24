import passport from 'passport';

import { Strategy as DiscordStrategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';

import * as fs from 'fs';

import { User } from './models/user.model';
import ExampleUserConfig from '../ShareX.json';

const discordStrategy = new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `https://i.alru.ga/auth/discord`,
    scope: [`identify`, `email`]
}, async (accessToken: string, refreshToken: string, profile: DiscordStrategy.Profile, done: VerifyCallback) => {
    const userExists = await User.findOne({ discordID: profile.id });
    if (!userExists) {
        const user = new User({ discordID: profile.id });
        user.save(err => {
            if (err) return done(err);
            else {
                const userConfig = ExampleUserConfig;
                userConfig.Arguments.key = user.token;

                fs.writeFileSync(`/var/www/sharex/configs/${user.discordID}.sxcu`, JSON.stringify(userConfig), `utf-8`);
                return done(err, user);
            }
        });
    } else return done(undefined, userExists);
});

passport.use(discordStrategy);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err: unknown, user: typeof User) => {
        done(err, user);
    });
});

export default passport;
