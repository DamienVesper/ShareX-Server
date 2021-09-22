import passport from 'passport';
import refresh from 'passport-oauth2-refresh';

import { Strategy as DiscordStrategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';

import { User } from './models/user.model';

const discordStrategy = new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `https://i.alru.ga/auth/callback`,
    scope: [`identify`, `email`, `guilds`, `guilds.join`]
    // eslint-disable-next-line
}, (accessToken: string, refreshToken: string, profile: DiscordStrategy.Profile, done: VerifyCallback) => {
    // eslint-disable-next-line
    (<any>profile).refreshToken = refreshToken;

    const userExists = User.findOne({ discordID: profile.id });
    if (!userExists) {
        const user = new User({ discordId: profile.id });
        user.save();
    }
});

passport.use(discordStrategy);
refresh.use(discordStrategy);

export default passport;
