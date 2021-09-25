import passport from 'passport';

import { Strategy as DiscordStrategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';

import { User } from './models/user.model';

const discordStrategy = new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `https://i.alru.ga/auth/callback`,
    scope: [`identify`, `email`]
}, (accessToken: string, refreshToken: string, profile: DiscordStrategy.Profile, done: VerifyCallback) => {
    const userExists = User.findOne({ discordID: profile.id });
    if (!userExists) {
        const user = new User({ discordId: profile.id });
        user.save(err => {
            if (err) return done(err);
            else return done(err, user);
        });
    }
});

passport.use(discordStrategy);

export default passport;
