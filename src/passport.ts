import passport from 'passport';

import { Strategy as DiscordStrategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';

import * as fs from 'fs';

import { User } from './models/user.model';
import randomString from './utils/randomString';

import ExampleUserConfig from '../ShareX.json';

const discordStrategy = new DiscordStrategy({
    clientID: (process.env.CLIENT_ID as string),
    clientSecret: (process.env.CLIENT_SECRET as string),
    callbackURL: `https://i.alru.ga/auth/discord`,
    scope: [`identify`, `email`]
}, (accessToken: string, refreshToken: string, profile: DiscordStrategy.Profile, done: VerifyCallback) => {
    void User.findOne({ discordID: profile.id }).then(userExists => {
        if (userExists == null) {
            const user = new User({
                username: profile.username,
                email: profile.email,
                discordID: profile.id,
                avatar: profile.avatar,

                token: randomString(32)
            });

            void user.save(err => {
                if (err != null) return done(err);
                else {
                    const userConfig = ExampleUserConfig;
                    userConfig.Arguments.key = user.token;

                    fs.writeFileSync(`/var/www/sharex/configs/${user.discordID}.sxcu`, JSON.stringify(userConfig), `utf-8`);
                    return done(err, user);
                }
            });
        } else return done(undefined, userExists);
    });
});

passport.use(discordStrategy);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    void User.findById(id, (err: unknown, user: typeof User) => {
        done(err, user);
    });
});

export default passport;
