import passport from 'passport';

import { Strategy as DiscordStrategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';

import * as fs from 'fs';

import { User } from './models/user.model';
import ExampleUserConfig from '../ShareX.json';

const discordStrategy = new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `https://i.alru.ga/auth/discord/callback`,
    scope: [`identify`, `email`]
}, async (accessToken: string, refreshToken: string, profile: DiscordStrategy.Profile, done: VerifyCallback) => {
    const userExists = await User.findOne({ discordID: profile.id });
    if (!userExists) {
        const user = new User({ discordId: profile.id });
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

export default passport;
